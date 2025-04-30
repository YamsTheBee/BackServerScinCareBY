// /routes/adminAppointmentRoutes.js
const express = require("express");
const router = express.Router();
const {
	getAllAppointments,
	updateAppointmentStatus,
} = require("../controllers/adminAppointmentController");

// Route pour récupérer tous les rendez-vous
router.get("/", getAllAppointments);

// Route pour mettre à jour le statut d'un rendez-vous
router.put("/:id/status", updateAppointmentStatus);

module.exports = router;
