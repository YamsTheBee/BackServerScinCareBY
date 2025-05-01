const express = require("express");
const router = express.Router();
const {
	createAppointment,
	getAllAppointments,
	updateAppointment,
	deleteAppointment,
} = require("../controllers/appointmentController");

// Middleware pour valider les données de la requête
const validateAppointmentData = (req, res, next) => {
	const { user_id, name, email, date, reason, status } = req.body;
	if (!user_id || !name || !email || !date || !reason) {
		return res.status(400).json({ message: "Tous les champs sont requis." });
	}
	next();
};

// Route pour créer un rendez-vous
router.post("/", validateAppointmentData, createAppointment);

// Route pour récupérer tous les rendez-vous
router.get("/", getAllAppointments);

// Route pour mettre à jour un rendez-vous
router.put("/:id", validateAppointmentData, updateAppointment);

// Route pour supprimer un rendez-vous
router.delete("/:id", deleteAppointment);

module.exports = router;
// test CRUD (5/5)
