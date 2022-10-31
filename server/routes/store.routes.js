const { Router } = require("express");
const router = Router();
const { getAllProducts } = require("../controllers/store.controller");

router.get("/", getAllProducts);

module.exports = router;
