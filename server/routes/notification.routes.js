const { Router } = require("express");
const {
	sendNotification,
	getUserNotifications,
	clickNotification,
} = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);
router.get("/user", getUserNotifications);
router.post("/click", clickNotification);

module.exports = router;
