const db = require("../config/db");

// Créer un RDV
const createAppointment = (
	user_id,
	date,
	reason,
	// biome-ignore lint/style/useDefaultParameterLast: <explanation>
	status = "pending",
	callback,
) => {
	db.query(
		"INSERT INTO appointments (user_id, date, reason, status) VALUES (?, ?, ?, ?)",
		[user_id, date, reason, status],
		(err, results) => {
			if (err) {
				return callback(err, null);
			}
			callback(null, results);
		},
	);
};

// Récupérer tous les RDV
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
