const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
	const { ...body } = req.body;

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
	return res.json(branches_id);
};

module.exports = {
	getAllProducts,
};
