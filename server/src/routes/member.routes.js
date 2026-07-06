const express = require("express");

const router = express.Router();

const {
  getAllMembers,
  getMemberById,
} = require("../controllers/member.controller");

router.get("/", getAllMembers);

router.get("/:id", getMemberById);

module.exports = router;