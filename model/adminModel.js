// models/adminModel.js
const db = require("../config/db"); // Connexion à la base de données

// Fonction pour récupérer tous les rendez-vous
const getAppointments = (callback) => {
	const query = "SELECT * FROM appointments"; // Requête pour récupérer tous les rendez-vous
	db.query(query, (err, results) => {
		if (err) {
			return callback(err, null);
		}
		callback(null, results);
	});
};

// Fonction pour mettre à jour le statut d'un rendez-vous
const updateAppointmentStatus = (appointmentId, status, callback) => {
	const query = "UPDATE appointments SET status = ? WHERE id = ?";
	db.query(query, [status, appointmentId], (err, results) => {
		if (err) {
			return callback(err, null);
		}
		callback(null, results);
	});
};

// Fonction pour supprimer un rendez-vous
const deleteAppointment = (appointmentId, callback) => {
	const query = "DELETE FROM appointments WHERE id = ?";
	db.query(query, [appointmentId], (err, results) => {
		if (err) {
			return callback(err, null);
		}
		callback(null, results);
	});
};

module.exports = {
	getAppointments,
	updateAppointmentStatus,
	deleteAppointment,
};
