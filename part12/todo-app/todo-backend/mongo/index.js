const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

if (MONGO_URL && !mongoose.connection.readyState) {
	console.log(MONGO_URL);
	mongoose
		.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("connected to mongodb"))
		.catch(() => console.error("failed to connect"));
}
module.exports = {
	Todo,
};
