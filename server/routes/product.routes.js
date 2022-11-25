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
	getProducts,
} = require("../controllers/product.controller");

router.get("/", getAllProducts);
router.get("/user", getProducts);
router.get("/:id", getProduct);
router.get("/store/:id", getProductsOfStore);
router.get("/branch/:id", getProductsOfBranch);
router.post("/", addProduct);
router.put("/", editProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:search", productSearch);

module.exports = router;
