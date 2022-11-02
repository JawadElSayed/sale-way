const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const addStore = async (req, res) => {
	const { image, ...body } = req.body;

	try {
		// saving image
		// setting default case
		let image_path;
		if (!image) image_path = `./public/images/store/default.jpg`;
		else {
			// spliting base64
			const splited_image = body.image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];

			// generating unique name acourding it time
			image_path = `./public/images/store/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) return res.status(400).json({ message: err.message });
			});
		}

		// creating store
		const store = await prisma.stores.create({
			data: { ...body, image: image_path },
		});
		res.status(200).json({ store: store });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getAllBranches = async (req, res) => {
	try {
		const branches = await prisma.branches.findMany({
			orderBy: { name: "asc" },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getBranchesOfStore = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		const branches = await prisma.branches.findMany({
			where: { store_id: parseInt(req.params.id) },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const addBranch = async (req, res) => {
	const { category, image, ...body } = req.body;

	try {
		// get category
		const get_category = await prisma.categories.findFirst({
			where: { category: category.toLowerCase() },
		});

		const category_id = get_category?.id ?? 0;

		// saving image
		// setting default case
		let image_path;
		if (!image) image_path = `./public/images/store/default.jpg`;
		else {
			// spliting base64
			const splited_image = body.image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];

			// generating unique name acourding it time
			image_path = `./public/images/store/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) return res.status(400).json({ message: err.message });
			});
		}

		// creating branch
		const branch = await prisma.branches.create({
			data: {
				...body,
				image: image_path,
				store_types: {
					create: {
						categories: {
							connectOrCreate: {
								where: { id: category_id },
								create: {
									category: body.category.toLowerCase(),
								},
							},
						},
					},
				},
			},
		});

		res.status(200).json({ branch: branch });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deletBranch = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		// delete connection of accesses
		await prisma.accesses.deleteMany({
			where: { branch_id: parseInt(req.params.id) },
		});

		// delete connection of store types
		await prisma.store_types.deleteMany({
			where: { branch_id: parseInt(req.params.id) },
		});

		// delete connection of products
		await prisma.products.deleteMany({
			where: { branches: { every: { id: parseInt(req.params.id) } } },
		});

		// delete branch
		const branch = await prisma.branches.delete({
			where: { id: parseInt(req.params.id) },
		});
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const branchSearch = async (req, res) => {
	try {
		// get branches acourding to search
		const branches = await prisma.branches.findMany({
			where: {
				OR: [
					{ name: { contains: req.params.search } },
					{ about: { contains: req.params.search } },
					{
						products: {
							some: { discount: { gte: req.params.search } },
						},
					},
					{
						store_types: {
							some: {
								categories: { category: req.params.search },
							},
						},
					},
				],
			},
			orderBy: { name: "asc" },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const filterBranchesByType = async (req, res) => {
	try {
		const branches = await prisma.branches.findMany({
			where: {
				store_types: {
					every: {
						categories: {
							category: req.params.filter.toLowerCase(),
						},
					},
				},
			},
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		// TODO: add motification clicks
		const users = await prisma.users.findMany({
			where: { user_types: { user_type: "user" } },
		});
		res.status(200).json({ users: users });
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

const addStoreAccess = async (req, res) => {
	const { store_id, user_id } = req.body;

	try {
		// getting branches of store
		const branches = await prisma.branches.findMany({
			where: { store_id: store_id },
			select: { id: true },
		});

		// change key from id to branch id
		const branches_array = [];
		for (let branch of branches) {
			branches_array.push({ branch_id: branch.id });
		}

		// adding access
		await prisma.users.update({
			where: { id: user_id },
			data: { accesses: { createMany: { data: branches_array } } },
		});
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const addBranchAccess = async (req, res) => {
	const { ...body } = req.body;

	try {
		await prisma.accesses.create({ data: { ...body } });

		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// TODO: products of store
// TODO: analytics of store
// TODO: analytics of notification

module.exports = {
	addStore,
	getAllBranches,
	getBranchesOfStore,
	addBranch,
	deletBranch,
	branchSearch,
	filterBranchesByType,
	getAllUsers,
	searchUsers,
	filterUsers,
	addUser,
	getUser,
	addStoreAccess,
	addBranchAccess,
};
