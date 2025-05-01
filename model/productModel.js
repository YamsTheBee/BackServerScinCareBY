const db = require("../config/db");

const getAllProducts = async () => {
	try {
		const query = "SELECT * FROM produits ORDER BY id ASC"; // table produits
		const [rows] = await db.execute(query);
		return rows;
	} catch (err) {
		throw new Error("Erreur lors de la récupération des produits");
	}
};

const getProductById = async (id) => {
	try {
		const query = "SELECT * FROM produits WHERE id = ?"; // table produits
		const [rows] = await db.execute(query, [id]);
		return rows[0];
	} catch (err) {
		throw new Error("Erreur lors de la récupération du produit");
	}
};

const createProduct = async (product) => {
	try {
		const query = `
      INSERT INTO produits (name, description, price, product_type, product_url, brand, volume, skin_type, ingredients, benefits, avis)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `; // table produits
		const [result] = await db.execute(query, [
			product.name,
			product.description,
			product.price,
			product.product_type,
			product.product_url,
			product.brand,
			product.volume,
			product.skin_type,
			product.ingredients,
			product.benefits,
			product.avis,
		]);
		return { ...product, id: result.insertId };
	} catch (err) {
		throw new Error("Erreur lors de la création du produit");
	}
};

const updateProduct = async (id, updatedProduct) => {
	try {
		const query = `
      UPDATE produits SET
      name = ?, description = ?, price = ?, product_type = ?, product_url = ?, brand = ?, volume = ?, skin_type = ?, ingredients = ?, benefits = ?, avis = ?
      WHERE id = ?
    `; // table produits
		await db.execute(query, [
			updatedProduct.name,
			updatedProduct.description,
			updatedProduct.price,
			updatedProduct.product_type,
			updatedProduct.product_url,
			updatedProduct.brand,
			updatedProduct.volume,
			updatedProduct.skin_type,
			updatedProduct.ingredients,
			updatedProduct.benefits,
			updatedProduct.avis,
			id,
		]);
		return updatedProduct;
	} catch (err) {
		throw new Error("Erreur lors de la mise à jour du produit");
	}
};

const deleteProduct = async (id) => {
	try {
		const query = "DELETE FROM produits WHERE id = ?"; // table produits
		await db.execute(query, [id]);
	} catch (err) {
		throw new Error("Erreur lors de la suppression du produit");
	}
};

module.exports = {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
// test CRUD (5/5)
