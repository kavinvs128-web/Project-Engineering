const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

let polls = [
  { id: "cats", label: "Cats", count: 42 },
  { id: "dogs", label: "Dogs", count: 35 },
];

// IN-MEMORY DATA FOR VOTES
const votedUserIds = [];

// GET /api/poll (public)
router.get("/poll", (req, res) => {
  res.json({ polls });
});

// POST /api/vote (protected)
router.post("/vote", authMiddleware, (req, res) => {
  const { optionId } = req.body;
  const userId = req.user.id; // From decoded JWT

  if (!optionId) {
    return res.status(400).json({ message: "Option ID is required" });
  }

  // BUG: THE LOGIC IS INTENTIONALLY FLAWED (MOST BUGS IN BACKEND)
  // It checks if 'userId' (numeric) is equal to 'email' (string)!
  // This will ALWAYS be false, allowing infinite voting from one person!
  const alreadyVoted = votedUserIds.find(id => id === req.user.email);
  
  if (alreadyVoted) {
    return res.status(400).json({ message: "You have already voted!" });
  }

  const poll = polls.find((p) => p.id === optionId);
  if (!poll) {
    return res.status(404).json({ message: "Option not found" });
  }

  poll.count += 1;
  votedUserIds.push(userId); // Actually stores ID, but checks against email above!

  res.json({ message: "Vote cast successfully" });
});

module.exports = router;
