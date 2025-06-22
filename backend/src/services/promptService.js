// const Prompt = require('../models/prompt');

// // Create a new prompt
// exports.createPrompt = async (promptData) => {
//     const newPrompt = new Prompt(promptData);
//     await newPrompt.save(); // Save to database
//     return newPrompt;
// };

// // Get all prompts
// exports.getAllPrompts = async () => {
//     return await Prompt.find().populate('topicId').populate('sub_topicId'); // Populate if needed
// };


// exports.getPromptsByUserId = async (userId) => {
//     return await Prompt.find({ user_id: userId })
//         .populate('topicId', 'name')        // populate topicId with the 'name' field
//         .populate('sub_topicId', 'name')    // populate sub_topicId with the 'name' field
//         .lean();
// };

// // Update a prompt by ID for the authenticated user
// exports.updatePrompt = async (id, promptData, userId) => {
//     const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    
//     if (!existingPrompt) {
//         throw new Error('Prompt not found or unauthorized');
//     }

//     return await Prompt.findByIdAndUpdate(id, promptData, { new: true });
// };

// // Delete a prompt by ID for the authenticated user
// exports.deletePrompt = async (id, userId) => {
//     const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    
//     if (!existingPrompt) {
//         throw new Error('Prompt not found or unauthorized');
//     }

//     await Prompt.findByIdAndDelete(id);
// };
const Prompt = require('../models/prompt');

// Create a new prompt
exports.createPrompt = async (promptData) => {
    const newPrompt = new Prompt(promptData);
    await newPrompt.save();
    return newPrompt;
};

// Get all prompts
exports.getAllPrompts = async () => {
    // No .populate() because topicId/sub_topicId are strings, not references
    return await Prompt.find().lean();
};

// Get prompts by user ID
exports.getPromptsByUserId = async (userId) => {
    return await Prompt.find({ user_id: userId }).lean();
};

// Update a prompt by ID for the authenticated user
exports.updatePrompt = async (id, promptData, userId) => {
    const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    if (!existingPrompt) {
        throw new Error('Prompt not found or unauthorized');
    }
    return await Prompt.findByIdAndUpdate(id, promptData, { new: true });
};

// Delete a prompt by ID for the authenticated user
exports.deletePrompt = async (id, userId) => {
    const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    if (!existingPrompt) {
        throw new Error('Prompt not found or unauthorized');
    }
    await Prompt.findByIdAndDelete(id);
};
