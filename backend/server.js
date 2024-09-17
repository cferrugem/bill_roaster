const express = require("express");
const app = express();
const cors = require("cors");

// Define CORS options
const corsOptions = {
  origin: ["http://localhost:5173"], // <- Change this to your React app
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Define a route
app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Start the server
app.listen(8000, () => {
  console.log("Server started on http://localhost:8000");
});
