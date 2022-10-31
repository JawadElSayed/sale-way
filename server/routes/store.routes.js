const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	productSearch,
} = require("../controllers/store.controller");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/search/:search", productSearch);

module.exports = router;
