const express = require("express");
const { signup } = require("../controllers/authController");
const { login } = require("../controllers/authController"); // Import the login controller
const router = express.Router();

// POST route for signup
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
