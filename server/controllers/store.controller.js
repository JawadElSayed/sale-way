const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addStore = async (req, res) => {
	const { image, ...body } = req.body;

	try {
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

		// creating store
		const store = await prisma.stores.create({
			data: { ...body, image: image_path },
		});
		res.status(200).json({ store: store });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// TODO: edit store
// TODO: delete store
// TODO: get all store
// TODO: get store

module.exports = {
	addStore,
};
