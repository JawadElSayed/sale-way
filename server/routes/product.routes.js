const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
	productSearch,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.put("/", editProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:search", productSearch);

module.exports = router;
