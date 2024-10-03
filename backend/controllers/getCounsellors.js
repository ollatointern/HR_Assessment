const db = require("../config/db"); // Make sure this path is correct

exports.getCounsellors = (req, res) => {
  const counselorId = req.params.id;

  // Query to fetch the counselor's details
  const query = `
        SELECT 
            cr.full_name,
            cr.email_address,
            TIMESTAMPDIFF(YEAR, cr.date_of_birth, CURDATE()) AS age,
            cr.gender,
            ua.date,
            ua.mode,
            ua.time_slot,
            ua.duration
        FROM 
            counsellor_registration cr
        LEFT JOIN 
            useravailability ua ON cr.id = ua.user_id
        WHERE 
            cr.id = ?`;

  db.query(query, [counselorId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    res.json(results[0]); // Send the first result
  });
};
