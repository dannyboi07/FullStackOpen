const logger = require('./logger');


function requestLogger(req, res, next) {
    console.log('Method: ', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('-----------------');
    next();
};

const unknownEndpoint = (req, res) =>  {
    res.status(404).json({ error: 'Unknown endpoint' });
};

const errorHandler = (error, req, res, next) =>  {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Malformatted ID' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (error.name = "JsonWebTokenError") {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

function getTokenFrom(req, res, next) {
    const auth = req.get('authorization');
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7);
    };

    next();
};

function userExtractor(req, res, next) {
    req.user = req.body;

    next();
}

module.exports = { 
    requestLogger, 
    unknownEndpoint, 
    errorHandler,
    getTokenFrom,
    userExtractor
};