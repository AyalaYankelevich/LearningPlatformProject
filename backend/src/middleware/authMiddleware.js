const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info for use in other routes
        next();
    });
};

module.exports = authenticateToken;
