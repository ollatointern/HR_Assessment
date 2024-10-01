const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // replace with your database username
  password: "", // replace with your database password
  database: "staff_hr_management", // replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return; // Exit if there's an error
  }
  console.log("Connected to the database.");
});

// Export the connection
module.exports = db;
