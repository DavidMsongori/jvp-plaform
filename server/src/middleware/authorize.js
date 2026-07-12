import AppError from "../utils/AppError.js";

/* ==========================================
   ROLE AUTHORIZATION MIDDLEWARE
========================================== */

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    /* ----------------------------
       AUTHENTICATED?
    ---------------------------- */

    if (!req.user) {
      return next(
        new AppError(
          "Authentication required.",
          401
        )
      );
    }

    /* ----------------------------
       AUTHORIZED?
    ---------------------------- */

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to access this resource.",
          403
        )
      );
    }

    next();
  };
};

export default authorize;