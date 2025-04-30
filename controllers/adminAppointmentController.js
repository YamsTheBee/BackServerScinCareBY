// /controllers/adminAppointmentController.js
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

// Récupérer tous les rendez-vous
const getAllAppointments = (req, res) => {
	const query = "SELECT * FROM appointments";
	connection.query(query, (err, results) => {
		if (err) {
			console.error("Erreur de récupération des rendez-vous :", err);
			return res.status(500).send("Erreur de récupération des rendez-vous.");
		}
		res.json(results);
	});
};

// Mettre à jour le statut d'un rendez-vous
const updateAppointmentStatus = (req, res) => {
	const { id } = req.params;
	const { status } = req.body; // statut peut être 'confirmé', 'annulé', etc.

	const query = "UPDATE appointments SET status = ? WHERE id = ?";
	connection.query(query, [status, id], (err) => {
		if (err) {
			console.error("Erreur de mise à jour du statut :", err);
			return res.status(500).send("Erreur de mise à jour du statut.");
		}
		res.send("Statut du rendez-vous mis à jour !");
	});
};

module.exports = { getAllAppointments, updateAppointmentStatus };
