const { Router } = require("express");
const {
	addBranchAccess,
	addStoreAccess,
} = require("../controllers/access.controller");
const router = Router();

router.post("/branch", addBranchAccess);
router.post("/store", addStoreAccess);

module.exports = router;
