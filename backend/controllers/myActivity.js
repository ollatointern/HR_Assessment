const db = require("../config/db");

exports.getSessionDetailsByStudent = (req, res) => {
  const studentId = req.params.studentId;

  const query = `
      SELECT session_id, counsellor_id, b_date, b_mode, b_duration, b_time_slot
      FROM session_management_demo
      WHERE student_id = ?
    `;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching session details" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No sessions found for this student" });
    }

    res.status(200).json(results); // Return only the results array
  });
};
