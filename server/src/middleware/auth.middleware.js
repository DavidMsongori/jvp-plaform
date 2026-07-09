const jwt = require("jsonwebtoken");

const Member = require("../models/Member");

/* =====================================================
   PROTECT ROUTES
===================================================== */

const protect = async (

  req,

  res,

  next

) => {

  try {

    let token = null;

    /* ==========================================
       AUTHORIZATION HEADER
    ========================================== */

    if (

      req.headers.authorization &&

      req.headers.authorization.startsWith(

        "Bearer "

      )

    ) {

      token =

        req.headers.authorization.split(

          " "

        )[1];

    }

    if (!token) {

      return res.status(401).json({

        success: false,

        message:

          "Access denied. No token provided.",

      });

    }

    /* ==========================================
       VERIFY TOKEN
    ========================================== */

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    const member = await Member.findById(

      decoded.id

    ).select("-password");

    if (!member) {

      return res.status(401).json({

        success: false,

        message:

          "Member not found.",

      });

    }

    /* ==========================================
       ACCOUNT STATUS
    ========================================== */

    if (

      member.activationStatus !==

      "Activated"

    ) {

      return res.status(401).json({

        success: false,

        message:

          "Account is not activated.",

      });

    }

    if (member.accountLocked) {

      return res.status(403).json({

        success: false,

        message:

          "Your account has been locked.",

      });

    }

    if (member.accountSuspended) {

      return res.status(403).json({

        success: false,

        message:

          "Your account has been suspended.",

      });

    }

    if (

      member.membershipStatus ===

      "Suspended"

    ) {

      return res.status(403).json({

        success: false,

        message:

          "Membership suspended.",

      });

    }

    req.member = member;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:

        "Invalid or expired token.",

    });

  }

};

/* =====================================================
   AUTHORIZE ROLES
===================================================== */

const authorize = (

  ...roles

) => {

  return (

    req,

    res,

    next

  ) => {

    if (!req.member) {

      return res.status(401).json({

        success: false,

        message:

          "Unauthorized.",

      });

    }

    if (

      !roles.includes(

        req.member.role

      )

    ) {

      return res.status(403).json({

        success: false,

        message:

          "You do not have permission to perform this action.",

      });

    }

    next();

  };

};

module.exports = {

  protect,

  authorize,

};