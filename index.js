const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Charger les variables d'environnement
const helmet = require("helmet");
const cors = require("cors"); // Importation de CORS
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

// Utilisation du middleware CORS
app.use(cors()); // Permettre les requêtes depuis d'autres origines

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
const db = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER, // Nom d'utilisateur
	password: process.env.DB_PASSWORD, // Mot de passe
	database: process.env.DB_NAME, // Nom de la base de données
});

db.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données:", err.stack);
		return;
	}
	console.log("Connexion à la base de données réussie");
});

// Utilisation de helmet pour sécuriser les headers HTTP
app.use(helmet());

const produitsRouter = require("./routes/ProduitsRoutes");
app.use("/api", produitsRouter);

// Importer les routes
const adminAppointmentsRouter = require("./routes/adminAppointmentRoutes");
app.use("/admin/appointments", adminAppointmentsRouter);

// Importation du routeur pour les rendez-vous
const appointmentsRouter = require("./routes/appointmentRoutes")(db);
app.use("/appointments", appointmentsRouter); // Lier le router avec Express

// Route par défaut
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
