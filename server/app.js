const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(morgan("dev"));

app.use(cors());

app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: false,
	})
);
app.use(bodyParser.json({ limit: "50mb" }));
//routes middleware
//app.use('/api', authRoutes)
fs.readdirSync("./routes").map((r) =>
	app.use("/api", require("./routes/" + r))
);

module.exports = app;
