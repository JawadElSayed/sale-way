const { Router } = require("express");
const router = Router();
const {
	getAllUsers,
	getUser,
	addUser,
	searchUsers,
	filterUsers,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.get("/search/:search", searchUsers);
router.post("/filter", filterUsers);

module.exports = router;
