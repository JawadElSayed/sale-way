const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "sale_waydb",
});

module.exports = db;
