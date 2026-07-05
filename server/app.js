const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    application: "JVP Connect API",
    version: "1.0.0",
    status: "Running",
    documentation: "/api/health",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

module.exports = app;
