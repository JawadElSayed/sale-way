const express = require("express");
const app = express();
const db = require("./config/db.config");

app.use(express.json());

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

app.listen(8000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Server running on port 8000");
		db();
	}
});
