// adminAppointmentModel.js
const db = require("../config/db"); 

// Récupérer tous les rendez-vous
const getAllAppointments = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM appointments", (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

// Supprimer un rendez-vous
const deleteAppointmentById = (id) => {
	return new Promise((resolve, reject) => {
		db.query("DELETE FROM appointments WHERE id = ?", [id], (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

module.exports = {
	getAllAppointments,
	deleteAppointmentById,
};
