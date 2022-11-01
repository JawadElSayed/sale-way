const { Router } = require("express");
const router = Router();
const { addStore, getAllBranches } = require("../controllers/admin.controller");

router.post("/add_store", addStore);
router.get("/branches", getAllBranches);

module.exports = router;
