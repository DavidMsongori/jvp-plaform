const Member = require("../models/Member");

/* =====================================================
   DASHBOARD
===================================================== */

exports.getDashboard = async () => {

  const [

    totalMembers,

    activeMembers,

    pendingMembers,

    suspendedMembers,

    expiredMembers,

  ] = await Promise.all([

    Member.countDocuments(),

    Member.countDocuments({

      membershipStatus: "Active",

    }),

    Member.countDocuments({

      membershipStatus: "Pending",

    }),

    Member.countDocuments({

      membershipStatus: "Suspended",

    }),

    Member.countDocuments({

      membershipStatus: "Expired",

    }),

  ]);

  /* ==========================================
     COUNTY OVERVIEW
  ========================================== */

  const countyOverview = await Member.aggregate([

    {

      $group: {

        _id: "$location.county",

        members: {

          $sum: 1,

        },

      },

    },

    {

      $sort: {

        members: -1,

      },

    },

  ]);

  /* ==========================================
     RECENT MEMBERS
  ========================================== */

  const recentMembers = await Member.find()

    .sort({

      createdAt: -1,

    })

    .limit(10)

    .select(

      "membershipNumber firstName middleName lastName profilePhoto role membershipStatus paymentStatus location createdAt"

    );

  return {

    statistics: {

      totalMembers,

      activeMembers,

      pendingMembers,

      suspendedMembers,

      expiredMembers,

    },

    countyOverview,

    recentMembers,

    recentActivities: [],

  };

};

/* =====================================================
   GET MEMBERS
===================================================== */

exports.getMembers = async (filters = {}) => {

  const query = {};

  if (filters.county) {

    query["location.county"] = filters.county;

  }

  if (filters.role) {

    query.role = filters.role;

  }

  if (filters.membershipStatus) {

    query.membershipStatus = filters.membershipStatus;

  }

  const members = await Member.find(query)

    .sort({

      createdAt: -1,

    });

  return members;

};

/* =====================================================
   GET MEMBER
===================================================== */

exports.getMemberById = async (id) => {

  const member = await Member.findById(id);

  if (!member) {

    throw new Error(

      "Member not found."

    );

  }

  return member;

};

/* =====================================================
   UPDATE MEMBER
===================================================== */

exports.updateMember = async (

  id,

  data

) => {

  const member = await Member.findById(id);

  if (!member) {

    throw new Error(

      "Member not found."

    );

  }

  Object.assign(

    member,

    data

  );

  if (

    typeof member.calculateProfileCompletion ===

    "function"

  ) {

    member.calculateProfileCompletion();

  }

  await member.save();

  return member;

};

/* =====================================================
   DELETE MEMBER
===================================================== */

exports.deleteMember = async (id) => {

  const member = await Member.findById(id);

  if (!member) {

    throw new Error(

      "Member not found."

    );

  }

  await member.deleteOne();

  return true;

};

/* =====================================================
   APPLICATIONS
===================================================== */

exports.getApplications = async () => {

  return [];

};

/* =====================================================
   LEADERSHIP
===================================================== */

exports.getLeadership = async () => {

  return [];

};

/* =====================================================
   EVENTS
===================================================== */

exports.getEvents = async () => {

  return [];

};

/* =====================================================
   PROGRAMS
===================================================== */

exports.getPrograms = async () => {

  return [];

};

/* =====================================================
   COUNTIES
===================================================== */

exports.getCounties = async () => {

  return [];

};

/* =====================================================
   PAYMENTS
===================================================== */

exports.getPayments = async () => {

  return [];

};

/* =====================================================
   CERTIFICATES
===================================================== */

exports.getCertificates = async () => {

  return [];

};

/* =====================================================
   NEWS
===================================================== */

exports.getNews = async () => {

  return [];

};

/* =====================================================
   NOTIFICATIONS
===================================================== */

exports.getNotifications = async () => {

  return [];

};

/* =====================================================
   SETTINGS
===================================================== */

exports.getSettings = async () => {

  return {};

};

exports.updateSettings = async () => {

  return true;

};