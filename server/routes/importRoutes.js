const express = require("express");

const router = express.Router();

const {
  importMembers,
} = require("../controllers/import.controllers");

router.post("/", importMembers);

module.exports = router;