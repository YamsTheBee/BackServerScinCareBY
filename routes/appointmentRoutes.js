const express = require("express");
const router = express.Router();

// Route POST pour ajouter un RDV
const createAppointment = (db) => {
	return (req, res) => {
		const { user_id, date, reason, status } = req.body;

		db.query(
			"INSERT INTO appointments (user_id, date, reason, status) VALUES (?, ?, ?, ?)",
			[user_id, date, reason, status || "pending"],
			(err) => {
				if (err) return res.status(500).send(err);
				res.status(201).send("Rendez-vous créé !");
			},
		);
	};
};

// Route GET pour récupérer les RDV
const getAppointments = (db) => {
	return (req, res) => {
		db.query("SELECT * FROM appointments", (err, results) => {
			if (err) return res.status(500).send(err);
			res.json(results);
		});
	};
};

// Route PUT pour mettre à jour un RDV
const updateAppointment = (db) => {
	return (req, res) => {
		const { id } = req.params;
		const { date, reason, status } = req.body;

		db.query(
			"UPDATE appointments SET date = ?, reason = ?, status = ? WHERE id = ?",
			[date, reason, status, id],
			(err) => {
				if (err) return res.status(500).send(err);
				res.send("Rendez-vous mis à jour !");
			},
		);
	};
};

// Route DELETE pour supprimer un RDV
const deleteAppointment = (db) => {
	return (req, res) => {
		const { id } = req.params;

		db.query("DELETE FROM appointments WHERE id = ?", [id], (err) => {
			if (err) return res.status(500).send(err);
			res.send("Rendez-vous supprimé !");
		});
	};
};

// Enregistrement des routes
module.exports = (db) => {
	router.post("/", createAppointment(db));
	router.get("/", getAppointments(db));
	router.put("/:id", updateAppointment(db));
	router.delete("/:id", deleteAppointment(db));

	return router;
};
