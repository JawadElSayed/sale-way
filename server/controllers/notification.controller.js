const { PrismaClient } = require("@prisma/client");
require("dotenv").config();
const FCM = require("fcm-notification");
const admin = require("firebase-admin");

const servreAcount = require("../config/push-notificatoin-key.json");

const credential = admin.credential.cert(servreAcount);
const fcm = new FCM(credential);

const prisma = new PrismaClient();

const date = new Date();
let lastWeek = new Date();
let lastMonth = new Date();
let lastYear = new Date();
lastWeek.setDate(date.getDate() - 6);
lastMonth.setMonth(date.getMonth() - 1);
lastYear.setFullYear(date.getFullYear() - 1);

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

			const firebase_id = response.split("messages/")[1];

			const oldNotification = await prisma.notifications.findFirst({
				where: {
					firebase_id: firebase_id,
				},
			});
			if (oldNotification) return;

			// saving notification in data
			const save = await prisma.notifications.create({
				data: {
					firebase_id: firebase_id,
					title: req.body.title,
					message: req.body.body,
					users: { connect: { email: req.email } },
					branches: { connect: { id: req.body.branch_id } },
				},
				include: {
					branches: true,
				},
			});
			res.status(200).json({ notification: save });
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// get every user his notifications
const getUserNotifications = async (req, res) => {
	try {
		const notifications = await prisma.notifications.findMany({
			where: {
				users: { email: req.email },
				clicked: false,
				deleted: false,
			},
			include: {
				branches: true,
			},
			orderBy: { created_at: "desc" },
		});
		res.status(200).json({ notifications: notifications });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const clickNotification = async (req, res) => {
	try {
		// check if already clicked
		const clicked = await prisma.notifications.findFirst({
			where: { firebase_id: req.body.firebase_id, clicked: true },
		});

		if (clicked) {
			return res
				.status(400)
				.json({ status: "error", message: "already clicked" });
		}

		// change notification to clicked
		const notification = await prisma.notifications.update({
			where: {
				firebase_id: req.body.firebase_id,
			},
			data: {
				clicked: true,
				clicked_at: new Date().toISOString(),
			},
		});
		res.status(200).json({
			status: "success",
			firebase_id: notification.firebase_id,
		});
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err.message });
	}
};

// get all clicked notifications
const getAllNotificationAnalytics = async (req, res) => {
	try {
		const analytics = await prisma.notifications.findMany({
			where: { clicked: true },
			include: { branches: true, users: true },
			orderBy: { created_at: "desc" },
		});

		res.status(200).json({ status: "success", analytics: analytics });
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err.message });
	}
};

const getBranchAnalytics = async (req, res) => {
	try {
		// checking if id is Integer
		if (!parseInt(req.params.id))
			return res.status(400).json({ message: "params must be Integer" });

		const analytics = await prisma.notifications.findMany({
			where: { branch_id: parseInt(req.params.id), clicked: true },
		});

		res.status(200).json({ status: "success", analytics: analytics });
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err.message });
	}
};
const getOwnerBranchAnalytics = async (req, res) => {
	try {
		const analytics = await prisma.notifications.findMany({
			where: {
				branches: {
					accesses: { some: { users: { email: req.email } } },
				},
				clicked: true,
			},
		});

		res.status(200).json({ status: "success", analytics: analytics });
	} catch (err) {
		console.error(err.message);
		res.status(400).json({ message: err.message });
	}
};

const deleteNotification = async (req, res) => {
	try {
		// check if already deleted
		const deleted = await prisma.notifications.findFirst({
			where: { firebase_id: req.params.id, deleted: true },
		});

		if (deleted) {
			return res
				.status(400)
				.json({ status: "error", message: "already deleted" });
		}

		// select notification as deleted
		const notification = await prisma.notifications.update({
			where: { firebase_id: req.params.id },
			data: { deleted: true },
		});

		res.status(200).json({
			status: "success",
			firebase_id: notification.firebase_id,
		});
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getBestUser = async (req, res) => {
	try {
		// get best user lastWeek
		const userLastWeek = await prisma.notifications.groupBy({
			by: ["user_id"],
			where: { clicked: true, clicked_at: { gte: lastWeek } },
			_count: { clicked: true },
			orderBy: { _count: { clicked: "desc" } },
			take: 1,
		});
		const nameLastWeek = await prisma.users.findFirst({
			where: { id: userLastWeek[0].user_id },
		});
		// get best user lastMonth
		const userLastMonth = await prisma.notifications.groupBy({
			by: ["user_id"],
			where: { clicked: true, clicked_at: { gte: lastMonth } },
			_count: { clicked: true },
			orderBy: { _count: { clicked: "desc" } },
			take: 1,
		});
		const nameLastMonth = await prisma.users.findFirst({
			where: { id: userLastMonth[0].user_id },
		});
		// get best user lastYear
		const userLastYear = await prisma.notifications.groupBy({
			by: ["user_id"],
			where: { clicked: true, clicked_at: { gte: lastYear } },
			_count: { clicked: true },
			orderBy: { _count: { clicked: "desc" } },
			take: 1,
		});
		const nameLastYear = await prisma.users.findFirst({
			where: { id: userLastYear[0].user_id },
		});
		res.status(200).json({
			status: "success",
			lastWeek: userLastWeek,
			lastMonth: userLastMonth,
			lastYear: userLastYear,
			nameLastWeek: nameLastWeek,
			nameLastMonth: nameLastMonth,
			nameLastYear: nameLastYear,
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	sendNotification,
	getUserNotifications,
	clickNotification,
	getAllNotificationAnalytics,
	getBranchAnalytics,
	deleteNotification,
	getBestUser,
	getOwnerBranchAnalytics,
};
