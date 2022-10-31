const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
	try {
		// getting user id from login email
		const user_id = await prisma.users.findUnique({
			where: {
				email: req.email,
			},
			select: {
				id: true,
			},
		});

		// getting branches id for the user
		const branches_id = await prisma.accesses.findMany({
			where: {
				user_id: user_id["id"],
			},
			select: {
				branch_id: true,
			},
		});

		// put branches id in array
		const branches_id_array = [];
		for (let branch of branches_id) {
			branches_id_array.push(branch["branch_id"]);
		}

		// getting products
		const products = await prisma.products.findMany({
			where: {
				branch_id: { in: branches_id_array },
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
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};

module.exports = {
	getAllProducts,
};
