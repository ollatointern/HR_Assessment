const express = require("express");
const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController"); // Import the login controller
const { getQuestions } = require("../controllers/getQuestions");
const { submitAssessment } = require("../controllers/submitAssessment");
const { getResult } = require("../controllers/getResult");
const router = express.Router();

// POST route for signup
router.post("/signup", signup);
router.post("/login", login);
router.get("/questions", getQuestions);
router.post("/submit-assessment", submitAssessment);
router.get("/user/:id", getResult);

module.exports = router;
