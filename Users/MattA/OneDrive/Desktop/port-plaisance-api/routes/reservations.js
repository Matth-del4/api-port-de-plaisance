const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

router.get("/catways/:id/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id,
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/catways/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/catways/:id/reservations", async (req, res) => {
  try {
    const reservation = new Reservation({
      catwayNumber: req.params.id,
      ...req.body,
    });
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/catways/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });

    Object.keys(req.body).forEach((key) => {
      if (req.body[key]) reservation[key] = req.body[key];
    });

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/catways/:id/reservations/:idReservation", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.idReservation,
    );
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
