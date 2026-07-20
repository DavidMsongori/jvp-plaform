import Leader from "../models/leader.model.js";

/* ===========================================================
   MEMBER POPULATE
=========================================================== */

const MEMBER_POPULATE = `
  memberNumber
  firstName
  middleName
  lastName
  profilePhoto
  county
  constituency
  ward
  gender
  membershipStatus
`;

/* ===========================================================
   CREATE LEADER
=========================================================== */

export const createLeader = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user?._id,
      updatedBy: req.user?._id,
    };

    // Prevent duplicate active assignment
    if (data.member) {
      const exists = await Leader.findOne({
        member: data.member,
        isActive: true,
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message:
            "This member already has an active leadership assignment.",
        });
      }
    }

    const leader = await Leader.create(data);

    const result = await Leader.findById(leader._id)
      .populate("member", MEMBER_POPULATE);

    return res.status(201).json({
      success: true,
      message: "Leader assigned successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET ALL LEADERS
=========================================================== */

export const getLeaders = async (req, res, next) => {
  try {
    const {
      category,
      county,
      active = true,
    } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (county) {
      filter.county = county;
    }

    if (active !== undefined) {
      filter.isActive = active === "true";
    }

    const leaders = await Leader.find(filter)
      .populate("member", MEMBER_POPULATE)
      .sort({
        category: 1,
        county: 1,
        displayOrder: 1,
        position: 1,
      });

    return res.json({
      success: true,
      count: leaders.length,
      data: leaders,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   GET LEADER
=========================================================== */

export const getLeader = async (req, res, next) => {
  try {
    const leader = await Leader.findById(req.params.id)
      .populate("member", MEMBER_POPULATE);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found.",
      });
    }

    return res.json({
      success: true,
      data: leader,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   UPDATE LEADER
=========================================================== */

export const updateLeader = async (req, res, next) => {
  try {
    const leader = await Leader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found.",
      });
    }

    Object.assign(leader, req.body);

    leader.updatedBy = req.user?._id;

    await leader.save();

    const result = await Leader.findById(leader._id)
      .populate("member", MEMBER_POPULATE);

    return res.json({
      success: true,
      message: "Leader updated successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/* ===========================================================
   DELETE LEADER
=========================================================== */

export const deleteLeader = async (req, res, next) => {
  try {
    const leader = await Leader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "Leader not found.",
      });
    }

    await leader.deleteOne();

    return res.json({
      success: true,
      message: "Leader removed successfully.",
    });
  } catch (error) {
    next(error);
  }
};