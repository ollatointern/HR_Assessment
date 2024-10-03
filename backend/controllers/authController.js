const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken package

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
  return emailRegex.test(email);
};

// Password validation function
const isValidPassword = (password) => {
  const passwordRegex = /^\d{4,6}$/; // Only 4-6 digits allowed
  return passwordRegex.test(password);
};

// Signup Controller
const signup = (req, res) => {
  const { fullName, email, password, gender, dateOfBirth } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  // Validate password format (4-6 digits)
  if (!isValidPassword(password)) {
    return res.status(400).json({ msg: "Password must be 4-6 digits" });
  }

  // Check if the user already exists
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        // Insert user into the database
        db.query(
          "INSERT INTO users (fullName, email, password, gender, dateOfBirth, status) VALUES (?, ?, ?, ?, ?, 'inactive')",
          [fullName, email, hash, gender, dateOfBirth],
          (err, result) => {
            if (err) throw err;
            res.status(201).json({ msg: "User registered successfully" });
          }
        );
      });
    }
  );
};

// Login Controller
const login = (req, res) => {
  const { email, password } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  // Check if the user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) throw err;

    // If user doesn't exist
    if (result.length === 0) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const user = result[0]; // Get the first user from the result

    // Compare the password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      // If password does not match
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      // Generate a token with the user's full name
      const token = jwt.sign(
        { fullName: user.fullName, id: user.id },
        (secretKey = "yash")
      );

      // Password is correct, proceed with login
      res.status(200).json({
        msg: "Login successful",
        token, // Send the token back to the client
        user: { email: user.email, name: user.fullName, id: user.Id },
      });
      console.log(user);
    });
  });
};
// Export both signup and login functions
module.exports = { signup, login };
