const express = require("express");
const app = express();

app.use(express.json());

// routes
const bookingRoutes = require("./routes/bookings");
app.use("/", bookingRoutes);

// health check
app.get("/", (req, res) => {
  res.send("QuickSeat API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});