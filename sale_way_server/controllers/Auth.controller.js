const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
let Validator = require("validatorjs");

const prisma = new PrismaClient();

const signup = async (req, res) => {
	const { name, email, password, user_type } = req.body;

	// adding check for strong password to validatorjs
	Validator.register(
		"strong_password",
		function (value, requirement, attribute) {
			return value.match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
				"i"
			);
		},
		"week password"
	);

	try {
		// validating data
		const rules = {
			name: "required|min:2",
			email: "required|email",
			password: "required|strong_password",
		};
		// push error if thier invalid input
		const validation = new Validator(req.body, rules);
		if (validation.fails()) {
			return res.status(400).json({
				status: "error",
				message: validation.errors.all(),
			});
		}
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: err.message,
		});
	}
};
