const config = {
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h', 
};

module.exports = config;