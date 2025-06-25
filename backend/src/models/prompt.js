const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    // id: the _id that mongoose creates automatically
    user_id: { type: String, required: true },
    topicId: { type: String, required: true },
    sub_topicId: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Prevent changing the custom id on update
promptSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.id) {
        delete update.id;
    }
    next();
});

const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;
