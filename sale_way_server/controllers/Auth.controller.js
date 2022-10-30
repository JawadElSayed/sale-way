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

}
