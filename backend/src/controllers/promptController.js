const { createPrompt, getPromptsByUserId, updatePrompt, deletePrompt } = require('../services/promptService');

// Create a new prompt
exports.createPromptController = async (req, res) => {
    try {
        const { topicId, sub_topicId, prompt, response } = req.body;

        const promptData = {
            user_id: req.user._id, // Ensure user is authenticated
            topicId,
            sub_topicId,
            prompt,
            response
        };

        const newPrompt = await createPrompt(promptData);
        res.status(201).json(newPrompt);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create prompt' });
    }
};

// // Get all prompts
exports.getAllPromptsController = async (req, res) => {
    try {
        const prompts = await getAllPrompts(); // Fetch all prompts
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all prompts' });
    }
};

// Get all prompts for the authenticated user
exports.getPromptsByUserIdController = async (req, res) => {
    try {
        const prompts = await getPromptsByUserId(req.user._id); // Fetch all prompts for the user
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve prompts' });
    }
};

// Update a prompt by ID for the authenticated user
exports.updatePromptController = async (req, res) => {
    const { id } = req.params; // This is the prompt ID
    const promptData = {
        topicId: req.body.topicId,
        sub_topicId: req.body.sub_topicId,
        prompt: req.body.prompt,
        response: req.body.response
    };

    try {
        const updatedPrompt = await updatePrompt(id, promptData, req.user._id);
        res.status(200).json(updatedPrompt);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Delete a prompt by ID for the authenticated user
exports.deletePromptController = async (req, res) => {
    const { id } = req.params; // This is the prompt ID
    try {
        await deletePrompt(id, req.user._id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
