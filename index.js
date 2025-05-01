const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Charger les variables d'environnement
const helmet = require("helmet");
const cors = require("cors");
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
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
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

// Importer les routes Admin
const adminAppointmentRoutes = require("./routes/adminAppointmentRoutes");
app.use("/admin", adminAppointmentRoutes); // Utilise les routes admin

// Importation du routeur pour les rendez-vous
const appointmentsRouter = require("./routes/appointmentRoutes");
app.use("/appointments", appointmentsRouter);

// Route par défaut
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
