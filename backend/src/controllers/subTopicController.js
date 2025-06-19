const subTopicService = require('../services/subTopicService');
const Topic = require('../models/topic');

// Create sub-topic
exports.createSubTopic = async (req, res) => {

    try {
        const subTopicData = req.body; // Define subTopicData
        const existingSubTopic = await subTopicService.subTopicExists(subTopicData.id);
        if (existingSubTopic) {
            return res.status(400).send({ message: 'Sub-topic already exists' });
        }

        const topicExists = await Topic.findOne({ id: subTopicData.topicId });
        if (!topicExists) {
            return res.status(400).send({ message: 'Topic with this id does not exist' });
        }

        // Create sub-topic with valid topicId
        const subTopic = await subTopicService.createSubTopic(subTopicData);

        const response = {
            id: subTopic.id,
            title: subTopic.title,
            topicId: subTopic.topicId,
            created_at: subTopic.created_at,
        };
        res.status(201).send(response);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all sub-topics
exports.getAllSubTopics = async (req, res) => {
    try {
        const subTopics = await subTopicService.getAllSubTopics();
        const response = subTopics.map(subTopic => ({
            id: subTopic.id,
            title: subTopic.title,
            topicId: subTopic.topicId,
            created_at: subTopic.created_at,
        }));
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a sub-topic by ID
exports.getSubTopicById = async (req, res) => {
    const subTopicId = req.params.id;
    try {
        const subTopic = await subTopicService.getSubTopicById(subTopicId);
        if (!subTopic) {
            return res.status(404).send({ message: 'Sub-topic not found' });
        }
        const response = {
            id: subTopic.id,
            title: subTopic.title,
            topicId: subTopic.topicId,
            created_at: subTopic.created_at,
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a sub-topic by ID
exports.updateSubTopic = async (req, res) => {
    const subTopicId = req.params.id;
    try {
        const subTopic = await subTopicService.updateSubTopicById(subTopicId, req.body);
        if (!subTopic) {
            return res.status(404).send({ message: 'Sub-topic not found' });
        }
        const response = {
            id: subTopic.id,
            title: subTopic.title,
            topicId: subTopic.topicId,
            created_at: subTopic.created_at,
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a sub-topic by ID
exports.deleteSubTopic = async (req, res) => {
    const subTopicId = req.params.id;
    try {
        const subTopic = await subTopicService.deleteSubTopicById(subTopicId);
        if (!subTopic) {
            return res.status(404).send({ message: 'Sub-topic not found' });
        }
        res.status(200).send({ message: 'Sub-topic deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
