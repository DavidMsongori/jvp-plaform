import jwt from "jsonwebtoken";

/* ==========================================
   CONFIG
========================================== */

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN || "7d";

/* ==========================================
   GENERATE ACCESS TOKEN
========================================== */

export const generateToken = (userId) => {

  if (!JWT_SECRET) {

    throw new Error(
      "JWT_SECRET is not configured."
    );

  }

  return jwt.sign(

    {

      id: userId,

    },

    JWT_SECRET,

    {

      expiresIn: JWT_EXPIRES_IN,

    }

  );

};

/* ==========================================
   VERIFY TOKEN
========================================== */

export const verifyToken = (token) => {

  if (!JWT_SECRET) {

    throw new Error(
      "JWT_SECRET is not configured."
    );

  }

  return jwt.verify(

    token,

    JWT_SECRET

  );

};