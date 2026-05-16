const express = require('express');
const router = express.Router();

// ❌ Exists but not used anywhere

router.get('/', (req, res) => {
  res.send("User routes working");
});

module.exports = router;
