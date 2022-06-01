const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync, setIncr } = require("../redis/index.js");

/* GET todos listing. */
router.get("/", async (_, res) => {
	const todos = await Todo.find({});
	res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
	const todo = await Todo.create({
		text: req.body.text,
		done: false,
	});
    await setIncr("added_todos");
	res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
	const { id } = req.params;
	req.todo = await Todo.findById(id);
	if (!req.todo) return res.sendStatus(404);

	next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
	await req.todo.delete();
	res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
	res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
	try {
		const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, {
			...req.body,
		}); // Implement this
		res.status(200).send(updatedTodo);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
