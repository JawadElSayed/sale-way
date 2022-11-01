const { Router } = require("express");
const router = Router();
const {
	addStore,
	getAllBranches,
	getBranchesOfStore,
} = require("../controllers/admin.controller");

router.post("/add_store", addStore);
router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchesOfStore);

module.exports = router;
