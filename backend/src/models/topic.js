const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

// Middleware to prevent changing the id during updates
topicSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.id) {
        delete update.id; // Remove id from update
    }
    next();
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;
