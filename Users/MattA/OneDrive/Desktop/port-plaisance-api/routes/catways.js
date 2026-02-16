const express = require("express");
const router = express.Router();
const Catway = require("../models/Catway");

router.get("/", async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json(catway);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const catway = new Catway(req.body);
    const newCatway = await catway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

    if (req.body.catwayState) catway.catwayState = req.body.catwayState;

    const updatedCatway = await catway.save();
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const catway = await Catway.findOneAndDelete({
      catwayNumber: req.params.id,
    });
    if (!catway) return res.status(404).json({ message: "Catway non trouvé" });
    res.json({ message: "Catway supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
