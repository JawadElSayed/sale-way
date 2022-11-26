const { PrismaClient } = require("@prisma/client");
const helpers = require("./helpers");

const prisma = new PrismaClient();

const addStore = async (req, res) => {
	const { image, ...body } = req.body;

	try {
		// saving image
		// setting default case
		let image_path;
		if (!image) image_path = `/static/images/store/default.jpg`;
		else {
			// spliting base64
			const splited_image = body.image.split(";base64,");
			const image_base64 = splited_image[1];
			const image_extension = splited_image[0].split("/")[1];

			// generating unique name according to time
			image_path = `/static/images/store/${Date.now()}.${image_extension}`;

			// saving image in folder
			fs.writeFile(image_path, image_base64, "base64", (err) => {
				if (err) return res.status(400).json({ message: err.message });
			});
		}

		// creating store
		const store = await prisma.stores.create({
			data: {
				name: body.name,
				phone: body.phone,
				about: body.about,
				image: image_path,
			},
		});
		res.status(200).json({ store: store });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deleteStore = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		// getting branches of store
		const branches = await prisma.branches.findMany({
			where: { stores: { id: parseInt(req.params.id) } },
		});

		// delete all branches of store
		for (let branch of branches) {
			const request = { params: { id: branch.id } };
			await helpers.deleteBranch(request);
		}

		// deleting store
		await prisma.stores.delete({ where: { id: parseInt(req.params.id) } });

		res.status(202).json({ success: true });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getAllStores = async (req, res) => {
	try {
		res.status(200).json({ stores: await prisma.stores.findMany({}) });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const getStore = async (req, res) => {
	// checking if id is Integer
	if (!parseInt(req.params.id))
		return res.status(400).json({ message: "params must be Integer" });

	try {
		const store = await prisma.stores.findUnique({
			where: { id: parseInt(req.params.id) },
		});

		res.status(200).json({ store: store });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	addStore,
	deleteStore,
	getAllStores,
	getStore,
};
