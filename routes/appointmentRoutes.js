const express = require("express");
const router = express.Router();

// Route POST pour ajouter un RDV
const createAppointment = (db) => {
	return (req, res) => {
		const { nom, email, typeSoin, dateRdv } = req.body;

		db.query(
			"INSERT INTO appointments (nom, email, typeSoin, dateRdv) VALUES (?, ?, ?, ?)",
			[nom, email, typeSoin, dateRdv],
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
		const { nom, email, typeSoin, dateRdv, status } = req.body;

		db.query(
			"UPDATE appointments SET nom = ?, email = ?, typeSoin = ?, dateRdv = ?, status = ? WHERE id = ?",
			[nom, email, typeSoin, dateRdv, status, id],
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
