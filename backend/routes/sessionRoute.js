const express = require("express");
const {
  bookSession,
  checkAvailability,
} = require("../controllers/sessionManage");
const router = express.Router();

router.post("/book", bookSession);
router.get("/availability/:user_id", checkAvailability);

module.exports = router;
