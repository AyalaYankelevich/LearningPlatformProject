const Prompt = require('../models/prompt');

// Create a new prompt
exports.createPrompt = async (promptData) => {
    const newPrompt = new Prompt(promptData);
    await newPrompt.save(); // Save to database
    return newPrompt;
};

// Get all prompts
exports.getAllPrompts = async () => {
    return await Prompt.find().populate('topicId').populate('sub_topicId'); // Populate if needed
};

// Get all prompts for a specific user
exports.getPromptsByUserId = async (userId) => {
    return await Prompt.find({ user_id: userId }); // Fetch all prompts for the user
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
