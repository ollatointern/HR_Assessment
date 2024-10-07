const express = require("express");
const { getSessionDetailsByStudent } = require("../controllers/myActivity");
const router = express.Router();

router.get("/sessions/:studentId", getSessionDetailsByStudent);

module.exports = router;
