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

// CREATE – Ajouter un rendez-vous
const createAppointment = (req, res) => {
	const { user_id, date, reason, status } = req.body;
	const query =
		"INSERT INTO appointments (user_id, date, reason, status) VALUES (?, ?, ?, ?)";

	connection.query(
		query,
		[user_id, date, reason, status || "pending"],
		(err, results) => {
			if (err) {
				console.error("Erreur lors de l'ajout du rendez-vous :", err);
				return res.status(500).send("Erreur d'enregistrement du rendez-vous.");
			}
			res
				.status(201)
				.json({
					message: "Rendez-vous créé avec succès",
					id: results.insertId,
				});
		},
	);
};

// READ – Récupérer tous les rendez-vous
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

// UPDATE – Modifier un rendez-vous
const updateAppointment = (req, res) => {
	const { id } = req.params;
	const { date, reason, status } = req.body;
	const query =
		"UPDATE appointments SET date = ?, reason = ?, status = ? WHERE id = ?";

	connection.query(query, [date, reason, status, id], (err) => {
		if (err) {
			console.error("Erreur lors de la mise à jour du rendez-vous :", err);
			return res.status(500).send("Erreur de mise à jour.");
		}
		res.send("Rendez-vous mis à jour avec succès.");
	});
};

// DELETE – Supprimer un rendez-vous
const deleteAppointment = (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM appointments WHERE id = ?";

	connection.query(query, [id], (err) => {
		if (err) {
			console.error("Erreur lors de la suppression du rendez-vous :", err);
			return res.status(500).send("Erreur de suppression.");
		}
		res.send("Rendez-vous supprimé avec succès.");
	});
};

// Exporter toutes les fonctions
module.exports = {
	createAppointment,
	getAppointments,
	updateAppointment,
	deleteAppointment,
};
