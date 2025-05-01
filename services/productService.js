const db = require("../config/db");

const getAllProducts = () => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM produits", (err, results) => {
			if (err) return reject(err);
			resolve(results);
		});
	});
};

const getProductById = (id) => {
	return new Promise((resolve, reject) => {
		db.query("SELECT * FROM produits WHERE id = ?", [id], (err, results) => {
			if (err) return reject(err);
			if (results.length === 0) return reject(new Error("Produit non trouvé"));
			resolve(results[0]);
		});
	});
};

const createProduct = (productData) => {
	return new Promise((resolve, reject) => {
		const query = "INSERT INTO produits SET ?";
		db.query(query, productData, (err, results) => {
			if (err) return reject(err);
			resolve({ id: results.insertId, ...productData });
		});
	});
};

const updateProduct = (id, productData) => {
	return new Promise((resolve, reject) => {
		const query = "UPDATE produits SET ? WHERE id = ?";
		db.query(query, [productData, id], (err, results) => {
			if (err) return reject(err);
			resolve({ id, ...productData });
		});
	});
};

const deleteProduct = (id) => {
	return new Promise((resolve, reject) => {
		const query = "DELETE FROM produits WHERE id = ?";
		db.query(query, [id], (err, results) => {
			if (err) return reject(err);
			resolve();
		});
	});
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
