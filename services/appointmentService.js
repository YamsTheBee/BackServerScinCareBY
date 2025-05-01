const db = require("../config/db");

const createAppointment = ({ user_id, name, email, date, reason, status }) => {
	return new Promise((resolve, reject) => {
		const query = `
			INSERT INTO appointments (user_id, name, email, date, reason, status)
			VALUES (?, ?, ?, ?, ?, ?)`;

		db.query(
			query,
			[user_id, name, email, date, reason, status || "pending"],
			(err, result) => {
				if (err) return reject(err);
				resolve(result.insertId);
			},
		);
	});
};

const getAllAppointments = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM appointments", (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

const updateAppointment = (id, { name, email, date, reason, status }) => {
	return new Promise((resolve, reject) => {
		const query = `
			UPDATE appointments 
			SET name = ?, email = ?, date = ?, reason = ?, status = ?
			WHERE id = ?`;

		db.query(query, [name, email, date, reason, status, id], (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
};

const deleteAppointment = (id) => {
	return new Promise((resolve, reject) => {
		db.query("DELETE FROM appointments WHERE id = ?", [id], (err) => {
			if (err) return reject(err);
			resolve();
		});
	});
};

module.exports = {
	createAppointment,
	getAllAppointments,
	updateAppointment,
	deleteAppointment,
};
