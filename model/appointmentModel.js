// models/appointmentModel.js
const db = require("../config/db");

const createAppointment = (nom, email, typeSoin, dateRdv, callback) => {
	db.query(
		"INSERT INTO appointments (nom, email, typeSoin, dateRdv) VALUES (?, ?, ?, ?)",
		[nom, email, typeSoin, dateRdv],
		(err, results) => {
			if (err) {
				return callback(err, null);
			}
			callback(null, results);
		},
	);
};

const getAllAppointments = (callback) => {
	db.query("SELECT * FROM appointments", (err, results) => {
		if (err) {
			return callback(err, null);
		}
		callback(null, results);
	});
};

module.exports = {
	createAppointment,
	getAllAppointments,
};
