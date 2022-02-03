const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
    const body = req.body;

    const user = await User.findOne({ username: body.username});
    if (!(user)) {
        return res.status(401).json({ error: 'User doesn\'t exist' });
    };

    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);
    if (!(passwordCorrect)) {
        return res.status(401).json({ error: 'Incorrect password' });
    };

    try {
        const userForToken = {
            username: user.username,
            id: user._id
        };
    
        const token = jwt.sign(userForToken, process.env.SECRET);    
        res.status(200).json({ token, username: user.username, name: user.name });
    } catch(exception) {
        next(exception);
    }

});

module.exports = loginRouter;