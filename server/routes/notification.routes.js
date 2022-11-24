const { Router } = require("express");
const {
	sendNotification,
	getUserNotifications,
	clickNotification,
	getAllNotificationAnalytics,
	getBranchAnalytics,
	deleteNotification,
	getBestUser,
	getBestBranch,
	getClicksAnalytics,
} = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);
router.get("/user", getUserNotifications);
router.post("/click", clickNotification);
router.get("/best-user", getBestUser);
router.get("/best-branch", getBestBranch);
router.get("/clicks", getClicksAnalytics);
router.get("/", getAllNotificationAnalytics);
router.get("/:id", getBranchAnalytics);
router.delete("/:id", deleteNotification);

module.exports = router;
