const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [];
let idCounter = 1;

// ➕ Add Item
app.post("/add", (req, res) => {
  const { title } = req.body;

  const newItem = {
    id: idCounter++,
    title,
    status: "available",
    claimedBy: null,
    claimExpiresAt: null
  };

  items.push(newItem);
  res.send(newItem);
});

// 📦 Get Items
app.get("/items", (req, res) => {
  res.send(items);
});

// 🔥 Claim Item (Concurrency Safe)
app.post("/claim/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);

  if (!item) return res.status(404).send("Not found");

  if (item.status !== "available") {
    return res.status(400).send("Already claimed");
  }

  item.status = "reserved";
  item.claimedBy = "user";
  item.claimExpiresAt = Date.now() + 30000; // 30 sec

  res.send(item);
});

// ❌ Mark Sold (Hallway Sale)
app.post("/mark-sold/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);

  if (!item) return res.status(404).send("Not found");

  item.status = "sold";
  item.claimedBy = null;
  item.claimExpiresAt = null;

  res.send(item);
});

// ⏳ Expiration Worker (Ghost Buyer)
setInterval(() => {
  const now = Date.now();

  items.forEach(item => {
    if (
      item.status === "reserved" &&
      item.claimExpiresAt &&
      now > item.claimExpiresAt
    ) {
      item.status = "available";
      item.claimedBy = null;
      item.claimExpiresAt = null;
    }
  });
}, 5000);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});