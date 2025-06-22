// const mongoose = require('mongoose');

// const promptSchema = new mongoose.Schema({
//     id: { type: String, required: true, unique: true },
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
//     topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }, // Reference to the Topic model
//     sub_topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTopic', required: true }, // Reference to the SubTopic model
//     prompt: { type: String, required: true },
//     response: { type: String, required: true },
//     created_at: { type: Date, default: Date.now }
// });

// // Middleware to prevent changing the id during updates
// promptSchema.pre('findOneAndUpdate', function(next) {
//     const update = this.getUpdate();
//     if (update.id) {
//         delete update.id; // Remove id from update
//     }
//     next();
// });


// const Prompt = mongoose.model('SubTopic', promptSchema);
// module.exports = Prompt;
const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    // id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true }, // בלי unique!
    // topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    // sub_topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTopic', required: true },
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
