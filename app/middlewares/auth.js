const jwt = require('jsonwebtoken');
const models = require('../models/v1');
const log = require('debug')('middleware:auth');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await models.User.findOne({
            where: {
                id: decoded.id,
                token
            }
        });

        if (!user) 
            throw new Error('Authentication failed');
        
        req.token = token;
        req.user = user;

        next();
    } catch(err) {
        log(err);
        res.status(401).send({
            error: 'Authentication failed'
        });
    }
}

module.exports = auth;