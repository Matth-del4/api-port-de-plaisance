const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const catwayRoutes = require("./routes/catways");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ message: "API Port de Plaisance - Bienvenue" });
});

app.use("/catways", catwayRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
