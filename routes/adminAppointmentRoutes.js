// adminAppointmentRoutes.js
const express = require("express");
const router = express.Router();
const adminAppointmentController = require("../controllers/adminAppointmentController");

// Route pour récupérer tous les rendez-vous
router.get("/appointments", adminAppointmentController.getAppointments);

// Route pour supprimer un rendez-vous
router.delete(
	"/appointments/:id",
	adminAppointmentController.deleteAppointment,
);

module.exports = router;
