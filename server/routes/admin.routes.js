const { Router } = require("express");
const router = Router();
const {
	addStore,
	getAllBranches,
	getBranchesOfStore,
	addBranch,
	deletBranch,
	branchSearch,
	filterBranchesByType,
	getAllUsers,
	searchUsers,
	filterUsers,
} = require("../controllers/admin.controller");

router.post("/add_store", addStore);
router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchesOfStore);
router.post("/add_branch", addBranch);
router.delete("/delete_branch/:id", deletBranch);
router.get("/branches/search/:search", branchSearch);
router.get("/branches/filter/:filter", filterBranchesByType);
router.get("/users", getAllUsers);
router.get("/users/search/:search", searchUsers);
router.post("/users/filter", filterUsers);

module.exports = router;
