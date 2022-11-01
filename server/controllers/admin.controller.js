const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addStore = async (req, res) => {
	const { ...body } = req.body;

	try {
		// saving image
		// setting default case
		let image_path;
		if (!body.image) {
			image_path = `./public/images/store/default.jpg`;
		} else {
			// spliting base64
			const splited_image = body.image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];

			// generating unique name acourding it time
			image_path = `./public/images/store/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}
			});
		}

		// creating store
		const store = await prisma.stores.create({
			data: {
				name: body.name,
				about: body.about,
				phone: body.phone,
				image: image_path,
			},
		});
		res.status(200).json({ store: store });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const getAllBranches = async (req, res) => {
	try {
		const branches = await prisma.branches.findMany({
			orderBy: { name: "asc" },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const getBranchesOfStore = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({
			message: "params must be Integer",
		});

	try {
		const branches = await prisma.branches.findMany({
			where: { store_id: parseInt(req.params.id) },
		});
		res.status(200).json({ branches: branches });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const addBranch = async (req, res) => {
	const { ...body } = req.body;

	try {
		// get category
		const category = await prisma.categories.findFirst({
			where: { category: body.category.toLowerCase() },
		});

		let category_id = 0;
		if (category) category_id = category["id"];

		// saving image
		// setting default case
		let image_path;
		if (!body.image) {
			image_path = `./public/images/store/default.jpg`;
		} else {
			// spliting base64
			const splited_image = body.image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];

			// generating unique name acourding it time
			image_path = `./public/images/store/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}
			});
		}

		// creating branch
		const branch = await prisma.branches.create({
			data: {
				name: body.name,
				about: body.about,
				phone: body.phone,
				store_id: body.id,
				latitude: body.latitude,
				longitude: body.longitude,
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
		res.status(400).json({
			message: err.message,
		});
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
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

module.exports = {
	addStore,
	getAllBranches,
	getBranchesOfStore,
	addBranch,
	branchSearch,
};
