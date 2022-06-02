const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const mongoose = require("mongoose");
// const { MONGO_URL } = require("./util/config");

// mongoose
// 	.connect(MONGO_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => console.log("Connected to mongo"))
// 	.catch(() => console.error("Failed to connect to mongo"));

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors({
    origin: process.env.REV_PROXY_URL
}));

app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
