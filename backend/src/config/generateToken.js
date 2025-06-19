require('dotenv').config(); // Load environment variables

const jwt = require('jsonwebtoken');

// Replace with your user data
const user = {
    id: 1,
    email: 'user@example.com',
    role: 'user'
};

const config = {
    jwtSecret: process.env.JWT_SECRET || 'your_default_secret_key', // Use JWT_SECRET from .env
    jwtExpiration: process.env.JWT_EXPIRATION || '1h' // Use JWT_EXPIRATION from .env
};

// Log the secret for debugging
console.log('JWT Secret:', config.jwtSecret);

// Generate the token
const token = jwt.sign({firstName: user.firstName, lastName: user.lastName , id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
});

console.log('Generated Token:', token);
