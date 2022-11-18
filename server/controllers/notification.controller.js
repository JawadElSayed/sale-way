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
		// creating message
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
		// sending notification by firebase
		fcm.send(message, async (err, response) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.status(200).json(response);
			const firebase_id = response.split("messages/")[1];

			// saving notification in data
			const save = await prisma.notifications.create({
				data: {
					firebase_id: firebase_id,
					title: req.body.title,
					message: req.body.body,
					users: { connect: { email: req.email } },
					branches: { connect: { id: req.body.branch_id } },
				},
			});
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getUserNotifications = async (req, res) => {
	try {
		const notifications = await prisma.notifications.findMany({
			where: {
				users: { email: req.email },
				clicked: false,
				created_at: { gt: req.body.last_delete },
			},
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	sendNotification,
	getUserNotifications,
};

// TODO: get notification analytics
// TODO: get store analytics
// TODO: get branch analytics
