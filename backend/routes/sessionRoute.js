const express = require("express");
const {
  bookSession,
  checkAvailability,
  getSessions,
  cancelSession,
} = require("../controllers/sessionManage");
const router = express.Router();

router.post("/book", bookSession);
router.get("/availability/:user_id", checkAvailability);
router.get("/get-sessions/:user_id", getSessions);
router.post("/cancel-session/:session_id", cancelSession);
module.exports = router;
