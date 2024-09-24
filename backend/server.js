// server.js

const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const pool = require("./config/database");

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Import routes
const userRoutes = require("./routes/userRoutes");

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Test database connection
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
