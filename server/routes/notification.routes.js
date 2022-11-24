const { Router } = require("express");
const {
	sendNotification,
	getUserNotifications,
	clickNotification,
	deleteNotification,
} = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);
router.get("/user", getUserNotifications);
router.post("/click", clickNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
