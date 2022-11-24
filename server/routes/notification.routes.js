const { Router } = require("express");
const {
	sendNotification,
	getUserNotifications,
	clickNotification,
	getAllNotificationAnalytics,
	getBranchAnalytics,
	deleteNotification,
} = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);
router.get("/user", getUserNotifications);
router.post("/click", clickNotification);
router.get("/", getAllNotificationAnalytics);
router.get("/:id", getBranchAnalytics);
router.delete("/:id", deleteNotification);

module.exports = router;
