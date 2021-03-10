const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");
const Connection = require("./Connection");
// console.log(process.env)
Connection();
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App is running on Not st ${port}`);
});
