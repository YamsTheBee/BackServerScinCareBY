// appointmentController.js
const mysql = require("mysql2");
require("dotenv").config();

// Connexion à la base de données
const connection = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

connection.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données:", err.stack);
		return;
	}
	console.log("Connexion à la base de données réussie");
});

// Fonction pour récupérer les rendez-vous
const getAppointments = (req, res) => {
	const query = "SELECT * FROM appointments";
	connection.query(query, (err, results) => {
		if (err) {
			console.error("Erreur de récupération des rendez-vous :", err);
			return res.status(500).send("Erreur de récupération des rendez-vous.");
		}
		res.json(results);
	});
};

// Exporter les fonctions
module.exports = { getAppointments };
