const mongoose = require("mongoose");
require("dotenv").config();

const DBPASS = process.env.DATABASE_PASSWORD;
const URL = process.env.DATABASE;

Connection = async () => {
	const dbconnect = await mongoose.connect(URL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	console.log("DB Connected");
};

module.exports = Connection;
