const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	productSearch,
	addProduct,
} = require("../controllers/store.controller");

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/products/search/:search", productSearch);
router.post("/add_product", addProduct);

module.exports = router;
