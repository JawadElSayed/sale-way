const { Router } = require("express");
const { sendNotification,getUserNotifications } = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);
router.post("/user", getUserNotifications);

module.exports = router;
