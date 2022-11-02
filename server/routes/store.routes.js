const { Router } = require("express");
const { addStore, deleteStore } = require("../controllers/store.controller");
const router = Router();

router.post("/", addStore);
router.delete("/:id", deleteStore);

module.exports = router;
