const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // ✅

router.get("/produits", productController.getProducts); // Endpoint pour récupérer tous les produits
router.get("/produits/:id", productController.getProduct); // Endpoint pour récupérer un produit par ID
router.post("/produits", productController.createProduct); // Endpoint pour créer un produit
router.put("/produits/:id", productController.updateProduct); // Endpoint pour mettre à jour un produit
router.delete("/produits/:id", productController.deleteProduct); // Endpoint pour supprimer un produit

module.exports = router;
