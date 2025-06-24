const {createPrompt, getAllPrompts, updatePrompt, deletePrompt, getPromptsWithNamesByUserId} = require('../services/promptService');

//Create prompt
exports.createPrompt = async (req, res) => {
    try {
        const { topicId, sub_topicId, prompt, response } = req.body;
        const promptData = {
            user_id: req.user.id, // or req.user._id (be consistent!)
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

//Get all prompts
exports.getAllPrompts = async (req, res) => {
    try {
        const prompts = await getAllPrompts();
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all prompts' });
    }
};

//Get prompts by user id (with topic/subtopic names)
exports.getPromptsByUserId = async (req, res) => {
    try {
        const promptsWithNames = await getPromptsWithNamesByUserId(req.user.id); // or req.user._id
        res.status(200).json(promptsWithNames);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve prompts' });
    }
};

// Update a prompt by ID for the authenticated user
exports.updatePrompt= async (req, res) => {
    const { id } = req.params;
    const promptData = {
        topicId: req.body.topicId,
        sub_topicId: req.body.sub_topicId,
        prompt: req.body.prompt,
        response: req.body.response
    };

    try {
        const updatedPrompt = await updatePrompt(id, promptData, req.user.id);
        res.status(200).json(updatedPrompt);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Delete a prompt by ID for the authenticated user
exports.deletePrompt = async (req, res) => {
    const { id } = req.params;
    try {
        await deletePrompt(id, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
