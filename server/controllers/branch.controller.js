const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

const getBranch = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		const branch = await prisma.branches.findUnique({
			where: { id: parseInt(req.params.id) },
			include: {
				products: {
					orderBy: { discount: "desc" },
					select: { discount: true },
					take: 1,
				},
			},
		});
		res.status(200).json({ branch: branch });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getBranchesOfUser = async (req, res) => {
	try {
		const branches = await prisma.branches.findMany({
			where: { accesses: { some: { users: { email: req.email } } } },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const editBranch = async (req, res) => {
	const { category, ...body } = req.body;

	try {
		// get category
		const get_category = await prisma.categories.findFirst({
			where: { category: category.toLowerCase() },
		});

		const category_id = get_category?.id ?? 0;

		const branch = await prisma.branches.update({
			where: { id: parseInt(req.body.id) },
			data: {
				...body,
				store_types: {
					connectOrCreate: {
						where: {
							branch_id_category_id: {
								branch_id: parseInt(req.body.id),
								category_id: category_id,
							},
						},
						create: {
							categories: {
								connectOrCreate: {
									where: { id: category_id },
									create: {
										category: category.toLowerCase(),
									},
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

module.exports = {
	getAllBranches,
	getBranchesOfUser,
	getBranchesOfStore,
	getBranch,
	addBranch,
	editBranch,
	deletBranch,
	branchSearch,
	filterBranchesByType,
};
