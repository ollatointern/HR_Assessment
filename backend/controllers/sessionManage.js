const db = require("../config/db"); // Make sure this path is correct

// Function to book a session and insert into session_management_demo
// exports.bookSession = (req, res) => {
//   const {
//     counsellorId,
//     b_time_slot,
//     b_date,
//     b_mode,
//     b_duration,
//     student_id,
//     session_link,
//   } = req.body;

//   // Insert the booking details into the session_management_demo table
//   const query = `
//         INSERT INTO session_management_demo (counsellor_id, b_time_slot, b_date, b_mode, b_duration, student_id, session_link, booked)
//         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`; // Setting booked to 1

//   db.query(
//     query,
//     [
//       counsellorId,
//       b_time_slot,
//       b_date,
//       b_mode,
//       b_duration,
//       student_id,
//       session_link,
//     ],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: "Error booking session" });
//       }
//       res.status(201).json({
//         message: "Session booked successfully",
//         sessionId: results.insertId,
//       });
//     }
//   );
// };

// Function to book a session and insert into session_management_demo
// exports.bookSession = (req, res) => {
//   const {
//     counsellorId,
//     b_time_slot,
//     b_date,
//     b_mode,
//     b_duration,
//     student_id,
//     session_link,
//   } = req.body;

//   // Insert the booking details into the session_management_demo table
//   const query = `
//         INSERT INTO session_management_demo (counsellor_id, b_time_slot, b_date, b_mode, b_duration, student_id, session_link, booked, status, created_at)
//         VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'active', NOW())`; // 'active' is a default value, NOW() for current timestamp

//   db.query(
//     query,
//     [
//       counsellorId,
//       b_time_slot,
//       b_date,
//       b_mode,
//       b_duration,
//       student_id,
//       session_link,
//     ],
//     (err, results) => {
//       if (err) {
//         console.error("Database error:", err); // Log the error for debugging
//         return res
//           .status(500)
//           .json({ error: "Error booking session", details: err.message }); // Include error details
//       }
//       res.status(201).json({
//         message: "Session booked successfully",
//         sessionId: results.insertId,
//       });
//     }
//   );
// };

// Function to check availability from the useravailability table

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
        console.error("Database error:", err); // Log database error for debugging
        return res.status(500).json({ error: "Error booking session" });
      }
      res.status(201).json({
        message: "Session booked successfully",
        sessionId: results.insertId,
      });
    }
  );
};

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

exports.getSessions = async (req, res) => {
  try {
    // Get student ID from request params
    const studentId = req.params.user_id;
    console.log(studentId);

    // Query to fetch all booked sessions for the student ID
    const query = `SELECT * FROM session_management_demo WHERE Student_id = ?`;

    // Executing the query and getting results
    db.query(query, [studentId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error fetching results" });
      }

      if (results.length > 0) {
        // Return all results as an array
        console.log(results);
        return res.status(200).json(results); // Return the whole array of sessions
      } else {
        return res
          .status(404)
          .json({ message: "No sessions found for the student" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch sessions",
    });
  }
};

// cancle session

// In your sessionController.js

exports.cancelSession = (req, res) => {
  const { session_id } = req.params;

  // Update the status of the session to 'cancelled'
  const query =
    "UPDATE session_management_demo SET status = ? WHERE session_id = ?";

  db.query(query, ["cancelled", session_id], (error, results) => {
    if (error) {
      console.error("Error cancelling session:", error);
      return res.status(500).json({ error: "Failed to cancel session" });
    }

    return res.status(200).json({ message: "Session cancelled successfully" });
  });
};
