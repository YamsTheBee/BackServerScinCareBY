const db = require("../config/db");

// ✅ Créer un RDV
const createAppointment = (req, res) => {
	const { user_id, name, email, date, reason, status } = req.body;

	db.query(
		`INSERT INTO appointments (user_id, name, email, date, reason, status)
		 VALUES (?, ?, ?, ?, ?, ?)`,
		[user_id, name, email, date, reason, status || "pending"],
		(err) => {
			if (err) return res.status(500).send(err);
			res.status(201).send("Rendez-vous créé !");
		},
	);
};

// ✅ Récupérer tous les RDV
const getAllAppointments = (req, res) => {
	db.query("SELECT * FROM appointments", (err, results) => {
		if (err) return res.status(500).send(err);
		res.json(results);
	});
};

// ✅ Mettre à jour un RDV
const updateAppointment = (req, res) => {
	const { id } = req.params;
	const { name, email, date, reason, status } = req.body;

	db.query(
		`UPDATE appointments
		 SET name = ?, email = ?, date = ?, reason = ?, status = ?
		 WHERE id = ?`,
		[name, email, date, reason, status, id],
		(err) => {
			if (err) return res.status(500).send(err);
			res.send("Rendez-vous mis à jour !");
		},
	);
};

// ✅ Supprimer un RDV
const deleteAppointment = (req, res) => {
	const { id } = req.params;

	db.query("DELETE FROM appointments WHERE id = ?", [id], (err) => {
		if (err) return res.status(500).send(err);
		res.send("Rendez-vous supprimé !");
	});
};

module.exports = {
	createAppointment,
	getAllAppointments,
	updateAppointment,
	deleteAppointment,
};
// test CRUD (5/5)
