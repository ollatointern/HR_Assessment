// const db = require("../config/db");
// exports.submitAssessment = async (req, res) => {
//   try {
//     const {
//       Student_id,
//       Student_name,
//       language_code,
//       exam_date,
//       completedTest,
//       jobSecurity,
//       WorkEnvironment,
//       WorkOverload,
//       WorkSatisfaction,
//       WorkLifeBalance,
//       CareerOpportunities,
//       Stress,
//       Anxiety,
//       Depression,
//       CopingMechanism,
//     } = req.body;

//     if (!Student_id || !Student_name || !language_code || !completedTest) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     // Insert the assessment results into the database
//     const query = `
//         INSERT INTO hrresult (Student_id, Student_name, language_code, exam_date, completedTest,
//         jobSecurity, WorkEnvironment, WorkOverload, WorkSatisfaction, WorkLifeBalance, CareerOpportunities,
//         Stress, Anxiety, Depression, CopingMechanism)
//         VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//     const values = [
//       Student_id,
//       Student_name,
//       language_code,
//       exam_date,
//       completedTest,
//       jobSecurity,
//       WorkEnvironment,
//       WorkOverload,
//       WorkSatisfaction,
//       WorkLifeBalance,
//       CareerOpportunities,
//       Stress,
//       Anxiety,
//       Depression,
//       CopingMechanism,
//     ];

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error("Database query error: ", err); // Log the actual error
//         return res.status(500).json({ msg: "Database error" });
//       }
//       return res
//         .status(200)
//         .json({ msg: "Assessment submitted successfully!" });
//     });
//   } catch (error) {
//     console.error("Server error: ", error); // Log the actual error
//     res.status(500).json({ msg: "Server error" });
//   }
// };

const db = require("../config/db");

exports.submitAssessment = async (req, res) => {
  try {
    const {
      Student_id,
      Student_name,
      language_code,
      completedTest,
      jobSecurity,
      WorkEnvironment,
      WorkOverload,
      WorkSatisfaction,
      WorkLifeBalance,
      CareerOpportunities,
      Stress,
      Anxiety,
      Depression,
      CopingMechanism,
    } = req.body;

    // Ensure required fields are present
    if (!Student_id || !Student_name || !language_code || !completedTest) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Insert the assessment results into the database
    const query = `
      INSERT INTO hrresult (Student_id, Student_name, language_code, exam_date, completedTest,
      jobSecurity, WorkEnvironment, WorkOverload, WorkSatisfaction, WorkLifeBalance, CareerOpportunities,
      Stress, Anxiety, Depression, CopingMechanism)
      VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      Student_id,
      Student_name,
      language_code,
      completedTest, // Ensure this is an integer
      jobSecurity, // Ensure this is an integer
      WorkEnvironment, // Ensure this is an integer
      WorkOverload, // Ensure this is an integer
      WorkSatisfaction, // Ensure this is an integer
      WorkLifeBalance, // Ensure this is an integer
      CareerOpportunities, // Ensure this is an integer
      Stress, // Ensure this is an integer
      Anxiety, // Ensure this is an integer
      Depression, // Ensure this is an integer
      CopingMechanism, // Ensure this is an integer
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database query error: ", err); // Log the actual error
        return res.status(500).json({ msg: "Database error" });
      }
      return res
        .status(200)
        .json({ msg: "Assessment submitted successfully!" });
    });
  } catch (error) {
    console.error("Server error: ", error); // Log the actual error
    res.status(500).json({ msg: "Server error" });
  }
};
