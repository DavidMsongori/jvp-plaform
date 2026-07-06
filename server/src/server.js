require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("===================================");
      console.log("🚀 JVP Connect API");
      console.log("Environment:", process.env.NODE_ENV || "development");
      console.log("Port:", PORT);
      console.log("===================================");
    });
  } catch (error) {
    console.error(error);
  }
})();