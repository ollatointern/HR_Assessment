const express = require("express");
const { getCounsellors } = require("../controllers/getCounsellors");
const router = express.Router();

router.get("/:id", getCounsellors);

module.exports = router;
