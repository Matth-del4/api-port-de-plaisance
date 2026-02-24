const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));

const catwayRoutes = require("./routes/catways");
const reservationRoutes = require("./routes/reservations");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ message: "API Port de Plaisance - Bienvenue" });
});

app.use("/catways", catwayRoutes);
app.use("/", reservationRoutes);
app.use("/users", userRoutes);
app.use("/", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
