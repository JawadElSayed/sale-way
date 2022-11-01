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
};
