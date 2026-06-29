const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
require("dotenv").config();
console.log(process.env.MONGO_URI);

const connectDB = require("./config/db");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test Route
app.get("/", (req, res) => {
  res.send("🚀 URL Shortener Backend is Running!");
});

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
