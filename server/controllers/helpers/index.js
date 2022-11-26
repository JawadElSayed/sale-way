const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteBranch = async (req) => {
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
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = { deleteBranch };
