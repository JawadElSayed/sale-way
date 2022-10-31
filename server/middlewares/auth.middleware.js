const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.email = decoded.email;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = authMiddleware;
