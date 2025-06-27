const express = require("express");
const Appointment = require("../models/Appointment");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/", upload.array("documents"), async (req, res) => {
  const { patient, doctor, date } = req.body;
  const docs = req.files.map((f) => f.filename);

  try {
    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      documents: docs
    });
    await newAppointment.save();
    res.json({ msg: "Appointment booked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: req.params.userId }, { doctor: req.params.userId }]
    })
      .populate("patient doctor", "name email")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;