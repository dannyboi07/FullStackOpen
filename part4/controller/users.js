const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
        res.json(users);
    } catch(exception) {
        next(exception);
    }
});

usersRouter.post('/', async (req, res, next) => {
    const body = req.body;
    
    if ((body.username.length < 3) || (body.password.length < 3)) {
        return res.status(400).json({ 
            error: 'Username and password must be at least 3 characters long' 
        });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });
    try {
        const result = await user.save();
        console.log(result);
        res.json(result);
    } catch(exception) {
        next(exception);
    };
});

module.exports = usersRouter;