const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", isApproved: true });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ msg: "Doctor approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;