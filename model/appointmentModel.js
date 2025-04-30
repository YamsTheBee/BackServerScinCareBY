const db = require("../config/db");

const Appointment = {
	getAll: (callback) => {
		db.query("SELECT * FROM appointments", callback);
	},

	create: (data, callback) => {
		db.query("INSERT INTO appointments SET ?", data, callback);
	},

	delete: (id, callback) => {
		db.query("DELETE FROM appointments WHERE id = ?", [id], callback);
	},
};

module.exports = Appointment;
