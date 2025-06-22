const { createPrompt, getPromptsByUserId, updatePrompt, deletePrompt, getAllPrompts } = require('../services/promptService');
const Topic = require('../models/topic');
const SubTopic = require('../models/subTopic');

async function getTopicMap() {
    const topics = await Topic.find().lean();
    const map = {};
    topics.forEach(t => { map[t.id] = t.title; });
    return map;
}

async function getSubTopicMap() {
    const subtopics = await SubTopic.find().lean();
    const map = {};
    subtopics.forEach(st => { map[st.id] = st.title; });
    return map;
}


//2
exports.createPromptController = async (req, res) => {
    try {
        console.log("req.user:", req.user);
        const { topicId, sub_topicId, prompt, response } = req.body;
        console.log("Body:", { topicId, sub_topicId, prompt, response });

        const promptData = {
            user_id: req.user.id,
            topicId,
            sub_topicId,
            prompt,
            response
        };
        console.log("Prompt data:", promptData);

        const newPrompt = await createPrompt(promptData);
        res.status(201).json(newPrompt);
    } catch (error) {
        console.error("Failed to create prompt:", error);
        res.status(500).json({ error: 'Failed to create prompt' });
    }
};


// Get all prompts
exports.getAllPromptsController = async (req, res) => {
    try {
        const prompts = await getAllPrompts(); // Fetch all prompts
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve all prompts' });
    }
};

exports.getPromptsByUserIdController = async (req, res) => {
    try {
        const prompts = await getPromptsByUserId(req.user.id);
        const topicMap = await getTopicMap();
        const subTopicMap = await getSubTopicMap();

        const promptsWithNames = prompts.map(p => ({
            topic: topicMap[p.topicId] || p.topicId,
            subTopic: subTopicMap[p.sub_topicId] || p.sub_topicId,
            createdAt: p.created_at,
            prompt: p.prompt,
            response: p.response
        }));

        res.status(200).json(promptsWithNames);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve prompts' });
    }
};

// Update a prompt by ID for the authenticated user
exports.updatePromptController = async (req, res) => {
    const { id } = req.params; 
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
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


