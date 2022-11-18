const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const FCM = require("fcm-notification");
const admin = require("firebase-admin");

const servreAcount = require("../config/push-notificatoin-key.json");

const credential = admin.credential.cert(servreAcount);
const fcm = new FCM(credential);

const prisma = new PrismaClient();

const sendNotification = async (req, res) => {
	try {
		const message = {
			token: req.body.token,
			notification: {
				title: req.body.title,
				body: req.body.body,
			},
			android: {
				notification: {
					channel_id: "pushnotificationapp",
				},
				priority: "high",
			},
			apns: {
				headers: {
					"apns-priority": "5",
				},
			},
		};

		fcm.send(message, (err, response) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.status(200).json(response);
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	sendNotification,
};

// TODO: get notification analytics
// TODO: get store analytics
// TODO: get branch analytics
