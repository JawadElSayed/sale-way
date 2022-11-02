const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

// TODO: deleteBranchAccess
// TODO: deleteStoreAccess

module.exports = {
	addBranchAccess,
	addStoreAccess,
};
