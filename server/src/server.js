import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

/* ==========================================
   START SERVER
========================================== */

async function startServer() {

  try {

    // Load the app AFTER environment variables
    const { default: app } = await import("./app.js");

    await connectDB();

    app.listen(PORT, () => {

      console.log("====================================");
      console.log("🚀 JVP Connect API Started");
      console.log(`🌍 Environment : ${process.env.NODE_ENV}`);
      console.log(`📡 Port        : ${PORT}`);
      console.log("====================================");

    });

  } catch (error) {

    console.error("Failed to start server.");
    console.error(error);

    process.exit(1);

  }

}

startServer();