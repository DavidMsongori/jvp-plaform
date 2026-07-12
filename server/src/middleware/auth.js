import User from "../models/User.js";
import Member from "../models/Member.js";

import { verifyToken } from "../utils/jwt.js";

/* ==========================================================
   AUTHENTICATION MIDDLEWARE
========================================================== */

const auth = async (req, res, next) => {

  try {

    /* ==========================================
       AUTHORIZATION HEADER
    ========================================== */

    const authHeader = req.headers.authorization;

    if (

      !authHeader ||

      !authHeader.startsWith("Bearer ")

    ) {

      return res.status(401).json({

        success: false,

        message: "Authentication required.",

      });

    }

    /* ==========================================
       TOKEN
    ========================================== */

    const token = authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Authentication token is missing.",

      });

    }

    /* ==========================================
       VERIFY TOKEN
    ========================================== */

    const decoded = verifyToken(token);

    /* ==========================================
       FIND USER
    ========================================== */

    const user = await User.findById(

      decoded.id

    ).select("-password");

    if (!user) {

      return res.status(401).json({

        success: false,

        message: "User account not found.",

      });

    }

    /* ==========================================
       ACCOUNT STATUS
    ========================================== */

    if (!user.isActive) {

      return res.status(403).json({

        success: false,

        message: "Your account has been deactivated.",

      });

    }

    /* ==========================================
       FIND MEMBER PROFILE
    ========================================== */

    const member = await Member.findOne({

      user: user._id,

    });

    /* ==========================================
       ATTACH AUTH DATA
    ========================================== */

    req.user = user;

    req.member = member;

    req.token = token;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:

        "Invalid or expired authentication token.",

    });

  }

};

export default auth;