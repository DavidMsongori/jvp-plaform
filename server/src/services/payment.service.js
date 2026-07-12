import { v4 as uuid } from "uuid";

import Member from "../models/Member.js";
import Payment from "../models/Payment.js";
import ActivityLog from "../models/ActivityLog.js";

import AppError from "../utils/AppError.js";

import flutterwaveClient from "../utils/flutterwave.client.js";

import {
  MEMBERSHIP,
  getMembershipFee,
} from "../config/membership.js";

/* ==========================================================
   GENERATE PAYMENT REFERENCE
========================================================== */

function generateReference(prefix = "MEM") {

  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const random = uuid()
    .replace(/-/g, "")
    .substring(0, 8)
    .toUpperCase();

  return `JVP-${prefix}-${date}-${random}`;

}

/* ==========================================================
   FIND MEMBER
========================================================== */

async function findMember(memberId) {

  const member = await Member.findById(memberId)

    .populate("user", "email role");

  if (!member) {

    throw new AppError(

      "Member not found.",

      404

    );

  }

  return member;

}

/* ==========================================================
   CHECK EXISTING PENDING PAYMENT
========================================================== */

async function getPendingMembershipPayment(memberId) {

  return Payment.findOne({

    member: memberId,

    paymentFor: "membership",

    status: "pending",

  }).sort({

    createdAt: -1,

  });

}

/* ==========================================================
   CREATE MEMBERSHIP PAYMENT RECORD
========================================================== */

export const createMembershipPayment = async (

  memberId

) => {

  const member = await findMember(memberId);

  /* ==========================================
     MEMBERSHIP ALREADY ACTIVE
  ========================================== */

  if (

    member.membershipStatus ===

    MEMBERSHIP.status.ACTIVE

  ) {

    throw new AppError(

      "Membership is already active.",

      400

    );

  }

  /* ==========================================
     REUSE PENDING PAYMENT
  ========================================== */

  const pending =

    await getPendingMembershipPayment(

      member._id

    );

  if (pending) {

    return {

      member,

      payment: pending,

      amount: pending.amount,

      reference: pending.reference,

      isExisting: true,

    };

  }

  /* ==========================================
     MEMBERSHIP FEE
  ========================================== */

  const amount = getMembershipFee(

    member.membershipType

  );

  const reference =

    generateReference("MEM");

  /* ==========================================
     CREATE PAYMENT
  ========================================== */

  const payment = await Payment.create({

    member: member._id,

    reference,

    paymentFor: "membership",

    amount,

    currency: MEMBERSHIP.currency,

    paymentMethod: "mpesa",

    status: "pending",

  });

  /* ==========================================
     ACTIVITY LOG
  ========================================== */

  await ActivityLog.create({

    user: member.user._id,

    action: "Membership payment created",

    module: "payments",

    description:

      "Member initiated membership payment.",

    targetId: payment._id,

    metadata: {

      reference,

      amount,

    },

  });

  return {

    member,

    payment,

    amount,

    reference,

    isExisting: false,

  };

};

/* ==========================================================
   INITIATE MEMBERSHIP PAYMENT
========================================================== */

export const initiateMembershipPayment = async (

  memberId

) => {

  const {

    member,

    payment,

    amount,

    reference,

  } = await createMembershipPayment(

    memberId

  );

  /* ==========================================
     FLUTTERWAVE PAYLOAD
  ========================================== */

  const payload = {

    tx_ref: reference,

    amount,

    currency: MEMBERSHIP.currency,

    redirect_url:

      `${process.env.CLIENT_URL}/membership/payment/success`,

    customer: {

      email: member.user.email,

      phonenumber: member.phone,

      name:

        `${member.firstName} ${member.lastName}`,

    },

    customizations: {

      title: "JVP Connect",

      description:

        "JVP Membership Registration Payment",

      logo:

        `${process.env.CLIENT_URL}/images/logo.png`,

    },

    meta: {

      memberId: member._id.toString(),

      paymentId: payment._id.toString(),

      paymentFor: "membership",

    },

  };

  /* ==========================================
     CREATE FLUTTERWAVE CHECKOUT
  ========================================== */

  const response =

    await flutterwaveClient.createPaymentLink(

      payload

    );

  payment.gatewayReference =

    response?.data?.link || null;

  payment.gatewayResponse = response;

  await payment.save();

  /* ==========================================
     ACTIVITY LOG
  ========================================== */

  await ActivityLog.create({

    user: member.user._id,

    action: "Flutterwave checkout created",

    module: "payments",

    description:

      "Flutterwave payment link generated.",

    targetId: payment._id,

    metadata: {

      reference,

      amount,

    },

  });

  return {

    success: true,

    message:

      "Payment initialized successfully.",

    payment,

    checkoutUrl:

      response?.data?.link,

  };

};


/* ==========================================================
   VERIFY FLUTTERWAVE TRANSACTION
========================================================== */

export const verifyMembershipPayment = async (

  transactionId

) => {

  const verification =

    await flutterwaveClient.verifyTransaction(

      transactionId

    );

  if (

    verification.status !== "success"

  ) {

    throw new AppError(

      "Unable to verify payment.",

      400

    );

  }

  const data = verification.data;

  if (

    data.status !== "successful"

  ) {

    throw new AppError(

      "Payment was not successful.",

      400

    );

  }

  const payment = await Payment.findOne({

    reference: data.tx_ref,

  }).populate({

    path: "member",

    populate: {

      path: "user",

      select: "email role",

    },

  });

  if (!payment) {

    throw new AppError(

      "Payment record not found.",

      404

    );

  }

  /* ==========================================
     ALREADY VERIFIED
  ========================================== */

  if (

    payment.status === "successful"

  ) {

    return payment;

  }

  payment.status = "successful";

  payment.gatewayReference =

    data.flw_ref;

  payment.gatewayResponse = data;

  payment.gatewayTransactionId =

    String(data.id);

  payment.paidAt = new Date();

  payment.verifiedAt = new Date();

  await payment.save();

  /* ==========================================
     ACTIVATE MEMBER
  ========================================== */

  await activateMembership(

    payment.member._id

  );

  /* ==========================================
     ACTIVITY LOG
  ========================================== */

  await ActivityLog.create({

    user: payment.member.user._id,

    action: "Membership payment verified",

    module: "payments",

    description:

      "Membership payment verified successfully.",

    targetId: payment._id,

    metadata: {

      reference: payment.reference,

      transactionId: data.id,

    },

  });

  return payment;

};

/* ==========================================================
   ACTIVATE MEMBERSHIP
========================================================== */

export const activateMembership = async (

  memberId

) => {

  const member = await findMember(

    memberId

  );

  /* ==========================================
     PREVENT DOUBLE ACTIVATION
  ========================================== */

  if (

    member.membershipStatus ===

      MEMBERSHIP.status.ACTIVE &&

    member.membershipFeePaid

  ) {

    return member;

  }

  member.membershipFeePaid = true;

  member.accountActivated = true;

  member.membershipStatus =

    MEMBERSHIP.status.ACTIVE;

  member.membershipExpiry =

    calculateMembershipExpiry();

  await member.save();

  await ActivityLog.create({

    user: member.user._id,

    action: "Membership activated",

    module: "members",

    description:

      "Membership activated after successful payment.",

    targetId: member._id,

  });

  return member;

};

/* ==========================================================
   RENEW MEMBERSHIP
========================================================== */

export const renewMembership = async (

  memberId

) => {

  const member = await findMember(

    memberId

  );

  member.membershipFeePaid = true;

  member.membershipStatus =

    MEMBERSHIP.status.ACTIVE;

  member.membershipExpiry =

    calculateMembershipExpiry(

      new Date()

    );

  await member.save();

  await ActivityLog.create({

    user: member.user._id,

    action: "Membership renewed",

    module: "members",

    description:

      "Membership renewed successfully.",

    targetId: member._id,

  });

  return member;

};

/* ==========================================================
   HANDLE FLUTTERWAVE WEBHOOK
========================================================== */

export const processWebhook = async (

  payload

) => {

  if (

    payload.event !== "charge.completed"

  ) {

    return {

      ignored: true,

    };

  }

  const transaction =

    payload.data;

  if (

    transaction.status !== "successful"

  ) {

    return {

      ignored: true,

    };

  }

  return verifyMembershipPayment(

    transaction.id

  );

};

/* ==========================================================
   MARK PAYMENT FAILED
========================================================== */

export const markPaymentFailed = async (

  reference,

  reason = "Unknown"

) => {

  const payment = await Payment.findOne({

    reference,

  });

  if (!payment) {

    throw new AppError(

      "Payment not found.",

      404

    );

  }

  payment.status = "failed";

  payment.gatewayResponse = {

    failureReason: reason,

  };

  await payment.save();

  return payment;

};


/* ==========================================================
   GET PAYMENT BY REFERENCE
========================================================== */

export const getPaymentByReference = async (

  reference

) => {

  const payment = await Payment.findOne({

    reference,

  })

    .populate({

      path: "member",

      populate: {

        path: "user",

        select: "email role",

      },

    });

  if (!payment) {

    throw new AppError(

      "Payment not found.",

      404

    );

  }

  return payment;

};

/* ==========================================================
   GET PAYMENT BY ID
========================================================== */

export const getPaymentById = async (

  paymentId

) => {

  const payment = await Payment.findById(

    paymentId

  )

    .populate({

      path: "member",

      populate: {

        path: "user",

        select: "email role",

      },

    });

  if (!payment) {

    throw new AppError(

      "Payment not found.",

      404

    );

  }

  return payment;

};

/* ==========================================================
   MEMBER PAYMENT HISTORY
========================================================== */

export const getPaymentHistory = async (

  memberId

) => {

  return Payment.find({

    member: memberId,

  })

    .sort({

      createdAt: -1,

    });

};

/* ==========================================================
   ADMIN PAYMENT LIST
========================================================== */

export const getAllPayments = async ({

  status,

  paymentFor,

  paymentMethod,

} = {}) => {

  const query = {};

  if (status) {

    query.status = status;

  }

  if (paymentFor) {

    query.paymentFor = paymentFor;

  }

  if (paymentMethod) {

    query.paymentMethod = paymentMethod;

  }

  return Payment.find(query)

    .populate({

      path: "member",

      select:

        "memberNumber firstName lastName county membershipType",

    })

    .sort({

      createdAt: -1,

    });

};

/* ==========================================================
   PAYMENT STATISTICS
========================================================== */

export const getPaymentStatistics = async () => {

  const [

    totalPayments,

    pendingPayments,

    successfulPayments,

    failedPayments,

    revenue,

  ] = await Promise.all([

    Payment.countDocuments(),

    Payment.countDocuments({

      status: "pending",

    }),

    Payment.countDocuments({

      status: "successful",

    }),

    Payment.countDocuments({

      status: "failed",

    }),

    Payment.aggregate([

      {

        $match: {

          status: "successful",

        },

      },

      {

        $group: {

          _id: null,

          totalRevenue: {

            $sum: "$amount",

          },

        },

      },

    ]),

  ]);

  return {

    totalPayments,

    pendingPayments,

    successfulPayments,

    failedPayments,

    totalRevenue:

      revenue.length > 0

        ? revenue[0].totalRevenue

        : 0,

  };

};

/* ==========================================================
   DELETE PENDING PAYMENT
========================================================== */

export const deletePendingPayment = async (

  reference

) => {

  const payment = await Payment.findOne({

    reference,

  });

  if (!payment) {

    throw new AppError(

      "Payment not found.",

      404

    );

  }

  if (

    payment.status !== "pending"

  ) {

    throw new AppError(

      "Only pending payments can be deleted.",

      400

    );

  }

  await Payment.deleteOne({

    _id: payment._id,

  });

  return true;

};

/* ==========================================================
   EXPORT
========================================================== */

export default {

  createMembershipPayment,

  initiateMembershipPayment,

  verifyMembershipPayment,

  activateMembership,

  renewMembership,

  processWebhook,

  markPaymentFailed,

  getPaymentHistory,

  getPaymentByReference,

  getPaymentById,

  getAllPayments,

  getPaymentStatistics,

  deletePendingPayment,

};