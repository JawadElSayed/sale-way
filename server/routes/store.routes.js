const { Router } = require("express");
const { addStore } = require("../controllers/store.controller");
const router = Router();

router.post("/", addStore);

module.exports = router;
