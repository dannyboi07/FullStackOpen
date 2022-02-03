const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// function getTokenFrom(req) {
//     const auth = req.get('authorization');
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//         return auth.substring(7);
//     };
//     return null;
// }

blogsRouter.get('/', async (req, res, next) => {

    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
        res.json(blogs);
    } catch (exception) {
        next(exception)
    };
});

blogsRouter.post('/', async (req, res, next) => {

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    console.log(decodedToken);
    if (!decodedToken) {
        return res.status(401).json({ error: "Token missing or invalid" });
    };

    if ((req.user.title === undefined) || (req.user.url === undefined)) {
        res.status(400).json({ error: "No blog title or url in request" });
    } else {
        const blog = new Blog({
            title: req.user.title,
            author: req.user.author,
            url: req.user.url,
            user: {
                _id: decodedToken.id
            },
            likes: req.user.likes || 0
        });

        try {
            const saveResult = await blog.save();
            const result = await Blog.findById(saveResult._id).populate("user", { username: 1, name: 1, id: 1 });
            console.log(result);

            await User.findByIdAndUpdate( decodedToken.id, { $push: { blogs: saveResult._id } } );
            res.status(201).json(result);
        } catch(exception) {
            next(exception);
        };
    };
});

blogsRouter.put('/:id', async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blogToUpdateId = req.params.id.toString();

    if (!decodedToken) {
        return res.status(401);
    };

    try {
        await Blog.findByIdAndUpdate(blogToUpdateId, req.body)
        const resultBlog = await Blog.findById(blogToUpdateId).populate("user", { username: 1, name: 1, id: 1 });
        console.log("updated",resultBlog);
        res.status(200).json(resultBlog);
    } catch(exception) {
        next(exception);
    };
});

blogsRouter.delete('/:id', async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blogToDeleteId = req.params.id.toString();
    console.log(blogToDeleteId, typeof(blogToDeleteId));

    if (!decodedToken) {
        return res.status(401);
    };

    try {
        const blog = (await Blog.findById(blogToDeleteId).populate('user', { username: 1, name: 1, id: 1 })).toObject();

        console.log(blog);
        console.log(blog.user.username !== decodedToken.username);
        if (blog.user.username !== decodedToken.username) {
            console.log("not authorized");
            res.status(401).end();
            return;
        };

        if ((!blog) && (blog._id.toString() !== blogToDeleteId)) {
            res.status(401).end();
            return;
        }; 
        await Blog.findByIdAndRemove(blogToDeleteId);
        res.status(204).end();
    } catch (exception) {
        next(exception);
    };
});

module.exports = blogsRouter;