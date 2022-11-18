const { Router } = require("express");
const { sendNotification } = require("../controllers/notification.controller");
const router = Router();

router.post("/", sendNotification);

module.exports = router;
