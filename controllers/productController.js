const productService = require("../services/productService");

const getProducts = async (req, res) => {
	try {
		const products = await productService.getAllProducts();
		res.json(products);
	} catch (err) {
		console.error("Erreur dans getProducts:", err);
		res.status(500).json({ message: err.message });
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await productService.getProductById(req.params.id);
		res.json(product);
	} catch (err) {
		res.status(404).json({ message: "Produit non trouvé" });
	}
};

const createProduct = async (req, res) => {
	try {
		const newProduct = await productService.createProduct(req.body);
		res.status(201).json(newProduct);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const updatedProduct = await productService.updateProduct(
			req.params.id,
			req.body,
		);
		res.json(updatedProduct);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		await productService.deleteProduct(req.params.id);
		res.status(204).end();
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
// test CRUD (5/5)