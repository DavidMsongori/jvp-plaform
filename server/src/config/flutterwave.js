/* ==========================================================
   FLUTTERWAVE CONFIGURATION
========================================================== */

const flutterwaveConfig = {

  publicKey: process.env.FLW_PUBLIC_KEY,

  secretKey: process.env.FLW_SECRET_KEY,

  encryptionKey: process.env.FLW_ENCRYPTION_KEY,

  webhookSecret: process.env.FLW_WEBHOOK_SECRET,

  baseUrl: "https://api.flutterwave.com/v3",

  currency: "KES",

  country: "KE",

};

/* ==========================================================
   VERIFY CONFIGURATION
========================================================== */

const required = [

  "FLW_PUBLIC_KEY",

  "FLW_SECRET_KEY",

  "FLW_ENCRYPTION_KEY",

  "FLW_WEBHOOK_SECRET",

];

const missing = required.filter(

  (key) => !process.env[key]

);

if (missing.length > 0) {

  console.warn(
    "⚠ Flutterwave configuration incomplete."
  );

  console.warn(
    `Missing environment variables: ${missing.join(", ")}`
  );

}

/* ==========================================================
   EXPORT
========================================================== */

export default flutterwaveConfig;