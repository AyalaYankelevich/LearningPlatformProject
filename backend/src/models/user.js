const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // Custom ID
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to prevent changing the id during updates
userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.id) {
        delete update.id;
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

