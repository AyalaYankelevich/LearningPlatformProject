const mongoose = require('mongoose');

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Ayala');
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

// Export the connection function
module.exports = connectToDatabase;
