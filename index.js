const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Charger les variables d'environnement
const helmet = require("helmet");
const app = express();
const port = 5000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER, // Nom d'utilisateur
	password: process.env.DB_PASSWORD, // Mot de passe
	database: process.env.DB_NAME, // Nom de la base de données
});

db.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données:", err.stack);
		return;
	}
	console.log("Connexion à la base de données réussie");
});

// Utilisation de helmet pour sécuriser les headers HTTP
app.use(helmet());

// Importation du routeur pour les rendez-vous
const appointmentsRouter = require("./routes/appointmentRoutes"); // Correcte le chemin si nécessaire
app.use("/appointments", appointmentsRouter); // Lier le router avec Express

// Route par défaut
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
