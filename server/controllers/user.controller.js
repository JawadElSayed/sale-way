const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
	try {
		// TODO: add motification clicks
		const users = await prisma.users.findMany({});
		res.status(200).json({ users: users });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getUser = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		const user = await prisma.users.findUnique({
			where: { id: parseInt(req.params.id) },
			include: {
				user_types: { select: { user_type: true } },
				accesses: { select: { branches: { select: { name: true } } } },
			},
		});
		res.status(200).json({ user: user });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const searchUsers = async (req, res) => {
	try {
		// TODO: add motification clicks
		const users = await prisma.users.findMany({
			where: {
				OR: [
					{ name: { contains: req.params.search } },
					{ email: { contains: req.params.search } },
				],
			},
		});
		res.status(200).json({ users: users });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const filterUsers = async (req, res) => {
	let { age, gender, user_type } = req.body;
	// TODO: add motification clicks
	try {
		// getting the year of age
		let year = new Date().getFullYear();
		if (age) year -= age;

		// formating the year of filter
		const date = new Date(year, "12", "31");

		// convert gender to undefined if NULL
		if (gender == "") gender = undefined;

		// convert user type to undefined if NULL
		if (user_type == "") user_type = undefined;

		// filter the users
		const users = await prisma.users.findMany({
			where: {
				user_types: { user_type: { equals: user_type } },
				gender: { equals: gender },
				DOB: { lte: date },
			},
		});
		res.status(200).json({ users: users });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const addUser = async (req, res) => {
	const { email, user_type, DOB, ...body } = req.body;

	try {
		// checking email if exists
		const get_email = await prisma.users.findUnique({
			where: { email: email },
		});

		if (get_email)
			return res.status(400).json({ message: "Email already exists" });

		// checking user type
		const get_user_type = await prisma.user_types.findFirst({
			where: { user_type: user_type.toLowerCase() },
		});

		// handling user type not found
		if (!get_user_type)
			return res.status(400).json({ message: "user type not found" });
		const user_type_id = get_user_type.id;

		// generate password
		const chars =
			"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*!?-_abcdefghijklmnopqrstuvwxyz";
		var password = "";
		for (let i = 0; i < 8; i++) {
			let rnum = Math.floor(Math.random() * chars.length);
			password += chars.substring(rnum, rnum + 1);
		}

		// convert string date to date
		const date = new Date(DOB);

		// creating a new user
		await prisma.users.create({
			data: {
				...body,
				email: email,
				DOB: date,
				user_types: { connect: { id: user_type_id } },
				password: await bcrypt.hash(password, 10),
			},
		});
		res.status(200).json({ password: password });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	getAllUsers,
	getUser,
	addUser,
	searchUsers,
	filterUsers,
};
