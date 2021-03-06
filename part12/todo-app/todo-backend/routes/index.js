const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const redis = require("../redis");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
	visits++;

	res.send({
		...configs,
		visits,
        url: process.env.REV_PROXY_URL || "not defined"
	});
});

router.get("/statistics", async (req, res) => {
    const redisRes = await redis.getAsync("added_todos");
    res.send({
        "added_todos": redisRes
    });
})

module.exports = router;
