const db = require("../config/db"); // Make sure this path is correct

exports.getResult = (req, res) => {
  const { id } = req.params;

  const query = `SELECT JobSecurity, WorkEnvironment, WorkOverload, WorkSatisfaction, WorkLifeBalance, CareerOpportunities, Stress, Anxiety, Depression, CopingMechanism FROM hrresult WHERE Student_id = ?`;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error fetching results" });
    }

    if (results.length > 0) {
      console.log(results[0]);
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: "Results not found" });
    }
  });
};
