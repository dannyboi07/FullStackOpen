const express = require('express');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controller/blogs');
const usersRouter = require('./controller/users');
const loginRouter = require('./controller/login');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const testingRouter = require('./controller/testing');

logger.info(`Connecting to ${config.MONGODB_URI}`);
mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('Connected to MongoDB');
})
.catch(error => {
    logger.error('Error connecting to MongoDB: ', error.message);
});

app.use(cors());
app.use(express.json());

app.use(middleware.getTokenFrom);
app.use(middleware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);

if (process.env.NODE_ENV === "test2") {
    console.log("In testing...");
    app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;