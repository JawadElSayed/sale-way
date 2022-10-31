const express = require("express");
const app = express();
require("dotenv").config();
const authMiddleware = require("./middlewares/auth.middleware");

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

// const userRoutes = require("./routes/users.routes");
// app.use("/users", userRoutes);

const storeRoutes = require("./routes/store.routes");
app.use("/stores", authMiddleware, storeRoutes);

app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server running on port ${process.env.PORT}`);
});
