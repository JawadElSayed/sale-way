const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	productSearch,
	addProduct,
	editProduct,
} = require("../controllers/store.controller");

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/products/search/:search", productSearch);
router.post("/add_product", addProduct);
router.post("/edit_product", editProduct);

module.exports = router;
