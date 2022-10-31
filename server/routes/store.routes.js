const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
} = require("../controllers/store.controller");

router.get("/", getAllProducts);
router.get("/:id", getProduct);

module.exports = router;
