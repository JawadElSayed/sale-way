const { Router } = require("express");
const router = Router();
const {
	addStore,
	getAllBranches,
	getBranchesOfStore,
	addBranch,
	branchSearch,
} = require("../controllers/admin.controller");

router.post("/add_store", addStore);
router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchesOfStore);
router.post("/add_branch", addBranch);
router.get("/branches/search/:search", branchSearch);

module.exports = router;
