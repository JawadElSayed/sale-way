const { Router } = require("express");
const router = Router();
const {
	getAllBranches,
	getBranchesOfUser,
	getBranchesOfStore,
	getBranch,
	addBranch,
	editBranch,
	deleteBranch,
	branchSearch,
	filterBranchesByType,
} = require("../controllers/branch.controller");

router.get("/", getAllBranches);
router.get("/user", getBranchesOfUser);
router.get("/store/:id", getBranchesOfStore);
router.get("/:id", getBranch);
router.post("/", addBranch);
router.put("/", editBranch);
router.delete("/:id", deleteBranch);
router.get("/search/:search", branchSearch);
router.get("/filter/:filter", filterBranchesByType);

module.exports = router;
