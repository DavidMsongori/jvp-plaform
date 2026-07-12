import * as paymentService from "../services/payment.service.js";

/* ==========================================================
   INITIATE MEMBERSHIP PAYMENT
========================================================== */

export const initiateMembershipPayment = async (

  req,

  res,

  next

) => {

  try {

    if (!req.member) {

      return res.status(404).json({

        success: false,

        message: "Member profile not found.",

      });

    }

    const payment =

      await paymentService.initiateMembershipPayment(

        req.member._id

      );

    return res.status(200).json({

      success: true,

      message: "Payment initialized successfully.",

      data: payment,

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   VERIFY MEMBERSHIP PAYMENT
========================================================== */

export const verifyMembershipPayment = async (

  req,

  res,

  next

) => {

  try {

    const { transactionId } = req.params;

    const payment =

      await paymentService.verifyMembershipPayment(

        transactionId

      );

    return res.status(200).json({

      success: true,

      message: "Payment verified successfully.",

      data: payment,

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   FLUTTERWAVE WEBHOOK
========================================================== */

export const webhook = async (

  req,

  res,

  next

) => {

  try {

    await paymentService.processWebhook(

      req.body

    );

    return res.status(200).json({

      success: true,

      message: "Webhook processed successfully.",

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   MEMBER PAYMENT HISTORY
========================================================== */

export const getPaymentHistory = async (

  req,

  res,

  next

) => {

  try {

    if (!req.member) {

      return res.status(404).json({

        success: false,

        message: "Member profile not found.",

      });

    }

    const payments =

      await paymentService.getPaymentHistory(

        req.member._id

      );

    return res.status(200).json({

      success: true,

      message: "Payment history retrieved successfully.",

      data: payments,

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   PAYMENT DETAILS
========================================================== */

export const getPayment = async (

  req,

  res,

  next

) => {

  try {

    const payment =

      await paymentService.getPaymentByReference(

        req.params.reference

      );

    return res.status(200).json({

      success: true,

      message: "Payment retrieved successfully.",

      data: payment,

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   ADMIN - GET ALL PAYMENTS
========================================================== */

export const getAllPayments = async (

  req,

  res,

  next

) => {

  try {

    const payments =

      await paymentService.getAllPayments(

        req.query

      );

    return res.status(200).json({

      success: true,

      message: "Payments retrieved successfully.",

      data: payments,

    });

  } catch (error) {

    next(error);

  }

};

/* ==========================================================
   ADMIN - PAYMENT STATISTICS
========================================================== */

export const getPaymentStatistics = async (

  req,

  res,

  next

) => {

  try {

    const statistics =

      await paymentService.getPaymentStatistics();

    return res.status(200).json({

      success: true,

      message: "Payment statistics retrieved successfully.",

      data: statistics,

    });

  } catch (error) {

    next(error);

  }

};