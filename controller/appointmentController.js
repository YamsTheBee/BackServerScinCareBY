const Appointment = require('../models/appointmentModel');

exports.getAllAppointments = (req, res) => {
  Appointment.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createAppointment = (req, res) => {
  const data = req.body;
  Appointment.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Rendez-vous créé', id: result.insertId });
  });
};

exports.deleteAppointment = (req, res) => {
  const { id } = req.params;
  Appointment.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Rendez-vous supprimé' });
  });
};
