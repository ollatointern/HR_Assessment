const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // This will establish the connection
const authRoutes = require("./routes/auth");
const counselorRoutes = require("./routes/counselorRoutes");
const sessionRoutes = require("./routes/sessionRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/counsellors", counselorRoutes);
app.use("/api/sessions", sessionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("HR Panel backend is running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
