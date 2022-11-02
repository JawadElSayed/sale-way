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
		const data_array = [];
		for (let branch of branches) {
			data_array.push({ user_id: user_id, branch_id: branch.id });
		}

		// adding access
		await prisma.accesses.createMany({
			data: data_array,
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

const deleteBranchAccess = async (req, res) => {
	try {
		await prisma.accesses.delete({
			where: {
				user_id_branch_id: {
					user_id: req.body.user_id,
					branch_id: req.body.branch_id,
				},
			},
		});
		res.status(200).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deleteStoreAccess = async (req, res) => {
	try {
		await prisma.accesses.deleteMany({
			where: {
				user_id: req.body.user_id,
				branches: { store_id: req.body.store_id },
			},
		});
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	addBranchAccess,
	addStoreAccess,
	deleteBranchAccess,
	deleteStoreAccess,
};
