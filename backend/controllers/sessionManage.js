const db = require("../config/db"); // Make sure this path is correct

// Function to book a session and insert into session_management_demo
exports.bookSession = (req, res) => {
  const {
    counsellorId,
    b_time_slot,
    b_date,
    b_mode,
    b_duration,
    student_id,
    session_link,
  } = req.body;

  // Insert the booking details into the session_management_demo table
  const query = `
        INSERT INTO session_management_demo (counsellor_id, b_time_slot, b_date, b_mode, b_duration, student_id, session_link, booked)
        VALUES (?, ?, ?, ?, ?, ?, ?, 1)`; // Setting booked to 1

  db.query(
    query,
    [
      counsellorId,
      b_time_slot,
      b_date,
      b_mode,
      b_duration,
      student_id,
      session_link,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error booking session" });
      }
      res.status(201).json({
        message: "Session booked successfully",
        sessionId: results.insertId,
      });
    }
  );
};

// Function to check availability from the useravailability table
exports.checkAvailability = (req, res) => {
  const userId = req.params.user_id;

  // Query to fetch availability data from useravailability table
  const query = `SELECT * FROM useravailability WHERE user_id = ?`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No availability found for this counselor" });
    }
    res.json(results); // Return the availability info
  });
};
