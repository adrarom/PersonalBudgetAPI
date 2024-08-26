const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ObjectId } = require('mongoose').Types;

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // if there's a jwt token
        try {
            token = req.headers.authorization.split(' ')[1]; // takes the token from Bearer <token> string
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            const user = await User.findById(decoded.user.id);
            req.user = user;
            console.log(req.user);
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
