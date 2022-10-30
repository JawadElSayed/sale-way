const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const userRoutes = require("./routes/auth.routes");
app.use("/", userRoutes);

// const userRoutes = require("./routes/users.routes");
// app.use("/users", userRoutes);

app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server running on port ${process.env.PORT}`);
});
