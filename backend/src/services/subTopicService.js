const SubTopic = require('../models/subTopic');

// Create a new sub-topic
exports.createSubTopic = async (subTopicData) => {
    const newSubTopic = new SubTopic(subTopicData);
    await newSubTopic.save();
    return newSubTopic;
};

// Check if a sub-topic exists
exports.subTopicExists = async (id) => {
    return await SubTopic.findOne({ id });
};

// Get all sub-topics
exports.getAllSubTopics = async () => {
    return await SubTopic.find().populate('topicId'); // Populate topicId if needed
};

// Get a sub-topic by ID
exports.getSubTopicById = async (id) => {
    return await SubTopic.findOne({ id }).populate('topicId');
};

// Update a sub-topic by ID
exports.updateSubTopicById = async (id, subTopicData) => {
    return await SubTopic.findOneAndUpdate({ id }, subTopicData, { new: true });
};

// Delete a sub-topic by ID
exports.deleteSubTopicById = async (id) => {
    return await SubTopic.findOneAndDelete({ id });
};
