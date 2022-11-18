const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authMiddleware = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(cors());

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "./public")));

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const accessRoutes = require("./routes/access.routes");
app.use("/access", authMiddleware, accessRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", authMiddleware, userRoutes);

const storeRoutes = require("./routes/store.routes");
app.use("/store", authMiddleware, storeRoutes);

const branchRoutes = require("./routes/branch.routes");
app.use("/branch", authMiddleware, branchRoutes);

const productRoutes = require("./routes/product.routes");
app.use("/product", authMiddleware, productRoutes);

const notificationRoutes = require("./routes/notification.routes");
app.use("/notification", authMiddleware, notificationRoutes);

app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server running on port ${process.env.PORT}`);
});
