const express = require("express");
const router = express.Router();

let users = []; // To keep track of users and their subscriptions
const supportedStocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

// Simple user authentication
router.post("/login", (req, res) => {
  const { email } = req.body;

  if (email) {
    const user = { email, subscribedStocks: [] };
    users.push(user);
    return res.json(user);
  }
  return res.status(400).json({ message: "Email is required" });
});

router.post("/subscribe", (req, res) => {
  const { email, stock } = req.body;
  if (!supportedStocks.includes(stock)) {
    return res.status(400).json({ message: "Unsupported stock" });
  }
  const user = users.find((u) => u.email === email);
  if (user) {
    user.subscribedStocks.push(stock);
    return res.json(user);
  }
  return res.status(404).json({ message: "User not found" });
});
module.exports = { router, users, supportedStocks };
