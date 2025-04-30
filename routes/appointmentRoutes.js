const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
require("dotenv").config();

// Connexion BDD
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "skincareByYams",
});

// Route POST pour ajouter un RDV
router.post("/", (req, res) => {
  const { nom, email, typeSoin, dateRdv } = req.body;
  db.query(
    "INSERT INTO appointments (nom, email, typeSoin, dateRdv) VALUES (?, ?, ?, ?)",
    [nom, email, typeSoin, dateRdv],
    (err) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Rendez-vous créé !");
    }
  );
});

// Route GET pour récupérer les RDV
router.get("/", (req, res) => {
  db.query("SELECT * FROM appointments", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
