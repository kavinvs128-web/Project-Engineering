const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const pollRoutes = require("./routes/poll");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", pollRoutes);

app.get("/", (req, res) => {
  res.send("Still In? Polling App API works!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
