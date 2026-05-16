const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");
const motivationRoutes = require("./routes/motivationRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/motivation", motivationRoutes);

app.get("/", (req, res) => {
  res.send("FocusForge API is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
