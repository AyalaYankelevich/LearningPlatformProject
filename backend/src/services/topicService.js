const Topic = require('../models/topic');

exports.topicExists = async (id) => {
    return await Topic.findOne({ id: id });
};

exports.createTopic = async (topicData) => {
    const topic = new Topic(topicData);
    return await topic.save();
};

exports.getAllTopics = async () => {
    return await Topic.find();
};

exports.getTopicById = async (topicId) => {
    return await Topic.findOne({ id: topicId });
};

exports.updateTopicById = async (id, updateData) => {
    return await Topic.findOneAndUpdate({ id: id }, updateData, { new: true });
};

exports.deleteTopicById = async (topicId) => {
    return await Topic.findOneAndDelete({ id: topicId });
};

    // return await Topic.findByIdAndUpdate(topicId, updateData, { new: true, runValidators: true });