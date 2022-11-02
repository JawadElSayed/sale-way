const { Router } = require("express");
const {
	addBranchAccess,
	addStoreAccess,
	deleteBranchAccess,
	deleteStoreAccess,
} = require("../controllers/access.controller");
const router = Router();

router.post("/branch", addBranchAccess);
router.post("/store", addStoreAccess);
router.delete("/branch", deleteBranchAccess);
router.delete("/store", deleteStoreAccess);

module.exports = router;
