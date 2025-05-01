const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/produits", productController.getProducts);
router.get("/produits/:id", productController.getProduct);
router.post("/produits", productController.createProduct);
router.put("/produits/:id", productController.updateProduct);
router.delete("/produits/:id", productController.deleteProduct);

module.exports = router;
// test CRUD (5/5)
