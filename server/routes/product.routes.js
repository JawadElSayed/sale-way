const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
	productSearch,
	getProductsOfStore,
	getProductsOfBranch,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/store/:id", getProductsOfStore);
router.get("/branch/:id", getProductsOfBranch);
router.post("/", addProduct);
router.put("/", editProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:search", productSearch);

module.exports = router;
