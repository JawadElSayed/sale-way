const { Router } = require("express");
const router = Router();
const { addStore } = require("../controllers/admin.controller");

router.post("/add_store", addStore);

module.exports = router;
