const Prompt = require('../models/prompt');
const Topic = require('../models/topic');
const SubTopic = require('../models/subTopic');

// Create a new prompt
async function createPrompt(promptData) {
    const newPrompt = new Prompt(promptData);
    await newPrompt.save();
    return newPrompt;
}

// Get all prompts
async function getAllPrompts() {
    return await Prompt.find().lean();
}

// Get prompts by user ID
async function getPromptsByUserId(userId) {
    return await Prompt.find({ user_id: userId }).lean();
}

// Update a prompt by ID for the authenticated user
async function updatePrompt(id, promptData, userId) {
    const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    if (!existingPrompt) {
        throw new Error('Prompt not found or unauthorized');
    }
    return await Prompt.findByIdAndUpdate(id, promptData, { new: true });
}

// Delete a prompt by ID for the authenticated user
async function deletePrompt(id, userId) {
    const existingPrompt = await Prompt.findOne({ _id: id, user_id: userId });
    if (!existingPrompt) {
        throw new Error('Prompt not found or unauthorized');
    }
    await Prompt.findByIdAndDelete(id);
}

// Get a map of topicId -> topic title
async function getTopicMap() {
    const topics = await Topic.find().lean();
    const map = {};
    topics.forEach(t => { map[t.id] = t.title; });
    return map;
}

// Get a map of subTopicId -> subtopic title
async function getSubTopicMap() {
    const subtopics = await SubTopic.find().lean();
    const map = {};
    subtopics.forEach(st => { map[st.id] = st.title; });
    return map;
}

// Get prompts (with topic/subtopic names) by user ID
async function getPromptsWithNamesByUserId(userId) {
    const prompts = await getPromptsByUserId(userId);
    const topicMap = await getTopicMap();
    const subTopicMap = await getSubTopicMap();
    return prompts.map(p => ({
        topic: topicMap[p.topicId] || p.topicId,
        subTopic: subTopicMap[p.sub_topicId] || p.sub_topicId,
        createdAt: p.created_at,
        prompt: p.prompt,
        response: p.response
    }));
}

module.exports = {
    createPrompt,
    getAllPrompts,
    getPromptsByUserId,
    updatePrompt,
    deletePrompt,
    getTopicMap,
    getSubTopicMap,
    getPromptsWithNamesByUserId
};