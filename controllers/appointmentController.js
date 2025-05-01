const appointmentService = require("../services/appointment.service");

// CREATE
const createAppointment = async (req, res) => {
	try {
		const { user_id, name, email, date, reason, status } = req.body;
		const appointmentId = await appointmentService.createAppointment({
			user_id,
			name,
			email,
			date,
			reason,
			status,
		});
		res.status(201).json({
			message: "Rendez-vous créé avec succès",
			id: appointmentId,
		});
	} catch (err) {
		console.error("Erreur lors de l'ajout du rendez-vous :", err);
		res.status(500).send("Erreur d'enregistrement du rendez-vous.");
	}
};

// READ
const getAppointments = async (req, res) => {
	try {
		const results = await appointmentService.getAllAppointments();
		res.json(results);
	} catch (err) {
		console.error("Erreur de récupération des rendez-vous :", err);
		res.status(500).send("Erreur de récupération des rendez-vous.");
	}
};

// UPDATE
const updateAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, date, reason, status } = req.body;
		await appointmentService.updateAppointment(id, {
			name,
			email,
			date,
			reason,
			status,
		});
		res.send("Rendez-vous mis à jour avec succès.");
	} catch (err) {
		console.error("Erreur lors de la mise à jour du rendez-vous :", err);
		res.status(500).send("Erreur de mise à jour.");
	}
};

// DELETE
const deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		await appointmentService.deleteAppointment(id);
		res.send("Rendez-vous supprimé avec succès.");
	} catch (err) {
		console.error("Erreur lors de la suppression du rendez-vous :", err);
		res.status(500).send("Erreur de suppression.");
	}
};

module.exports = {
	createAppointment,
	getAppointments,
	updateAppointment,
	deleteAppointment,
};

// test CRUD (5/5)