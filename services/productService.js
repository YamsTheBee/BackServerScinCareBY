const db = require("../config/db");

const getAllProducts = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM produits", (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

module.exports = {
	getAllProducts,
	// + les autres méthodes si tu les as (getProductById, etc.)
};
