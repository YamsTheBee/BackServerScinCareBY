const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env

const app = express();
const port = 5000;

// Connexion à la base de données
const connection = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER, // Nom d'utilisateur (par exemple, 'root')
	password: process.env.DB_PASSWORD, // Mot de passe
	database: process.env.DB_NAME, // Nom de la base de données
});

connection.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données:", err.stack);
		return;
	}
	console.log("Connexion à la base de données réussie");
});

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
