const { Router } = require("express");
const {
	addStore,
	deleteStore,
	getAllStores,
	getStore,
} = require("../controllers/store.controller");
const router = Router();

router.post("/", addStore);
router.delete("/:id", deleteStore);
router.get("/", getAllStores);
router.get("/:id", getStore);

module.exports = router;
