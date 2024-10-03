// controllers/getQuestions.js
const db = require("../config/db"); // Make sure this path is correct

const getQuestions = (req, res) => {
  db.query("SELECT * FROM working_question", (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.status(200).json(results);
  });
};

module.exports = { getQuestions };
