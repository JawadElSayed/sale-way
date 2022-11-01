const { Router } = require("express");
const router = Router();
const {
	getAllProducts,
	getProduct,
	productSearch,
	addProduct,
	editProduct,
	deleteProduct,
	getBranchDetails,
	getAllBranches,
	editBranch,
} = require("../controllers/store.controller");

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/products/search/:search", productSearch);
router.post("/add_product", addProduct);
router.post("/edit_product", editProduct);
router.get("/delete_product/:id", deleteProduct);
router.get("/branch_details/:id", getBranchDetails);
router.get("/branches", getAllBranches);
router.post("/edit_branch", editBranch);

module.exports = router;
