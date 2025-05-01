const express = require("express");
const router = express.Router();
const {
	createAppointment,
	getAppointments, // pas getAllAppointments ❌
	updateAppointment,
	deleteAppointment,
} = require("../controllers/appointmentController");

const validateAppointmentData = (req, res, next) => {
	const { user_id, name, email, date, reason, status } = req.body;
	if (!user_id || !name || !email || !date || !reason) {
		return res.status(400).json({ message: "Tous les champs sont requis." });
	}
	next();
};

router.post("/", validateAppointmentData, createAppointment);
router.get("/", getAppointments); // nom correct ici ✅
router.put("/:id", validateAppointmentData, updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
