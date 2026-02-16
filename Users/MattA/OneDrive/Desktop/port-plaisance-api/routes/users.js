const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password",
    );
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res
      .status(201)
      .json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] && key !== "email") user[key] = req.body[key];
    });

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:email", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
