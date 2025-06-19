const mongoose = require('mongoose');


const sub_topicSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    topicId: { type: String, required: true }, 
    title: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Middleware to prevent changing the id during updates
sub_topicSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.id) {
        delete update.id; // Remove id from update
    }
    next();
});

const Sub_Topic = mongoose.model('Sub_Topic', sub_topicSchema);
module.exports = Sub_Topic;
