const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// timeout function
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const getAllProducts = async (req, res) => {
	try {
		// getting products
		const products = await prisma.products.findMany({
			where: {
				branches: {
					accesses: { some: { users: { email: req.email } } },
				},
			},
			include: {
				images: {
					select: {
						image: true,
					},
				},
			},
		});

		res.status(200).json({ products: products });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const getProduct = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({
			message: "params must be Integer",
		});

	try {
		// getting product by id
		const product = await prisma.products.findUnique({
			where: { id: parseInt(req.params.id) },
			include: {
				images: {
					select: {
						image: true,
					},
				},
			},
		});

		res.status(200).json({ product: product });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const productSearch = async (req, res) => {
	try {
		// getting search products
		const products = await prisma.products.findMany({
			where: {
				// getting the user products only
				branches: {
					accesses: { some: { users: { email: req.email } } },
				},
				// matching the search words
				OR: [
					{
						name: { contains: req.params.search },
					},
					{
						description: { contains: req.params.search },
					},
					{
						discount: { gte: req.params.search },
					},
					{
						product_categories: {
							some: {
								categories: {
									category: { contains: req.params.search },
								},
							},
						},
					},
				],
			},
			// selecting images
			include: {
				images: {
					select: {
						image: true,
					},
				},
			},
		});

		res.status(200).json({ products: products });
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

const addProduct = async (req, res) => {
	const { ...body } = req.body;

	try {
		// getting all branches of user
		const branches = await prisma.branches.findMany({
			where: {
				accesses: { some: { users: { email: req.email } } },
			},
			select: {
				id: true,
			},
		});

		branches_array = [];
		for (let branch of branches) {
			branches_array.push(branch);
		}

		// select category if exists
		const category = await prisma.categories.findFirst({
			where: { category: body.category.toLowerCase() },
		});

		let category_id = 0;
		if (category) category_id = category["id"];

		// saving images in folder
		const images_array = [];

		for (let image of body.images) {
			// spliting base64
			const splited_image = image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];
			// generating unique name acourding it time
			await sleep(1);
			const image_path = `./public/images/products/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) {
					return res.status(400).json({
						message: err.message,
					});
				}
			});
			images_array.push({ image: image_path });
		}
		// setting default case
		if (images_array.length == 0)
			images_array.push({
				image: `./public/images/products/default.png`,
			});

		// adding product for all branches
		const product = await prisma.products.create({
			data: {
				name: body.name,
				description: body.description,
				discount: body.discount,
				// connecting product to category of create it
				product_categories: {
					create: {
						categories: {
							connectOrCreate: {
								where: {
									id: category_id,
								},
								create: {
									category: body.category.toLowerCase(),
								},
							},
						},
					},
				},
				// connect product to branch
				branches: {
					connect: branches_array,
				},
				images: {
					createMany: { data: images_array },
				},
			},
			include: { images: { select: { image: true } } },
		});
		res.status(200).json({ product: product });
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

const editProduct = async (req, res) => {
	const { ...body } = req.body;
	try {
		// get category
		const category = await prisma.categories.findFirst({
			where: { category: body.category.toLowerCase() },
		});

		// update product
		const product = await prisma.products.update({
			where: {
				id: body.id,
			},
			data: {
				name: body.name,
				description: body.description,
				discount: body.discount,
				product_categories: {
					update: {
						where: {
							product_id_category_id: {
								product_id: body.id,
								category_id: category["id"],
							},
						},
						data: {
							categories: { connect: { id: category["id"] } },
						},
					},
				},
			},
		});
		res.status(200).json({ product: product });
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		// delete connection of images
		await prisma.images.deleteMany({
			where: { product_id: parseInt(req.params.id) },
		});

		//  delet connetction of categories
		await prisma.product_categories.deleteMany({
			where: { product_id: parseInt(req.params.id) },
		});

		// delete product
		const product = await prisma.products.delete({
			where: { id: parseInt(req.params.id) },
		});

		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

const getBranchDetails = async (req, res) => {
	try {
		console.log(parseInt(req.params.id));
		const branch = await prisma.branches.findUnique({
			where: { id: parseInt(req.params.id) },
		});
		res.status(200).json({ branch: branch });
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

const editBranch = async (req, res) => {
	const { ...body } = req.body;

	try {
		// get category
		const category = await prisma.categories.findFirst({
			where: { category: body.category.toLowerCase() },
		});

		const branch = await prisma.branches.update({
			where: { id: parseInt(req.body.id) },
			data: {
				name: body.name,
				about: body.about,
				phone: body.phone,
				latitude: body.latitude,
				longitude: body.longitude,
				store_types: {
					connectOrCreate: {
						where: {
							branch_id_category_id: {
								branch_id: parseInt(req.body.id),
								category_id: category["id"],
							},
						},
						create: {
							categories: {
								connectOrCreate: {
									where: { id: category["id"] },
									create: { category: body.category },
								},
							},
						},
					},
				},
			},
		});
		res.status(200).json({ branch: branch });
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

module.exports = {
	getAllProducts,
	getProduct,
	productSearch,
	addProduct,
	editProduct,
	deleteProduct,
	getBranchDetails,
	editBranch,
};
