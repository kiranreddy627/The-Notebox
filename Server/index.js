const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// CORS configuration - Allow any origin
app.use(
  cors({
    origin: true, // Dynamically allows the requesting origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
require("./db")(); // Ensure db.js exports a function for connecting to MongoDB

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start the server
app.listen(port, () => {
  console.log(`Notebox-backend listening on port ${port}`);
});
