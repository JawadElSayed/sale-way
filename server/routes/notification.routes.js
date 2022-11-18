const { Router } = require("express");
const { sendNotification } = require("../controllers/notification.controller");
const router = Router();

router.get("/", sendNotification);

module.exports = router;
