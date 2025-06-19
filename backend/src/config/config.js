const config = {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key', // Replace with your secret key
    jwtExpiration: process.env.JWT_EXPIRATION || '1h', // Set default expiration time for the token
    // Add other configurations as needed
};

module.exports = config;