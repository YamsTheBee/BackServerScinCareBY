// adminAppointmentController.js
const appointmentModel = require("../model/adminAppointmentModel");

// Récupérer tous les rendez-vous
const getAppointments = async (req, res) => {
	try {
		const appointments = await appointmentModel.getAllAppointments();
		res.json(appointments);
	} catch (err) {
		res.status(500).json({
			message: "Erreur serveur lors de la récupération des rendez-vous",
		});
	}
};

// Supprimer un rendez-vous
const deleteAppointment = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await appointmentModel.deleteAppointmentById(id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Rendez-vous non trouvé" });
		}
		res.json({ message: "Rendez-vous supprimé avec succès" });
	} catch (err) {
		res.status(500).json({
			message: "Erreur serveur lors de la suppression du rendez-vous",
		});
	}
};

module.exports = {
	getAppointments,
	deleteAppointment,
};
