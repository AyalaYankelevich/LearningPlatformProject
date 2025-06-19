const topicService = require('../services/topicService');

//Create topic
exports.createTopic = async (req, res) => {
    try {
        const existingTopic = await topicService.topicExists(req.body.id);
        if (existingTopic) {
            return res.status(400).send({ message: 'Topic with this id already exists' });
        }
        // Proceed to create the topic since it doesn't exist
        const topic = await topicService.createTopic(req.body);
        const response = {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            created_at: topic.created_at,
        };
        res.status(201).send(response);
    } catch (error) {
        if (error.message === 'Topic with this ID already exists') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all topics
exports.getAllTopics = async (req, res) => {
    try {
        const topics = await topicService.getAllTopics();
        const response = topics.map(topic => ({
            id: topic.id,
            title: topic.title,
            description: topic.description,
            created_at: topic.created_at,
        }));
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a topic by ID
exports.getTopicById = async (req, res) => {
    const topicId = req.params.id; // Assuming the ID is passed as a URL parameter
    try {
        const topic = await topicService.getTopicById(topicId);
        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }
        const response = {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            created_at: topic.created_at,
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a topic by ID
exports.updateTopic = async (req, res) => {
    const topicId = req.params.id; // Assuming the ID is passed as a URL parameter
    try {
        const topic = await topicService.updateTopicById(topicId, req.body);
        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }
        const response = {
            id: topic.id,
            title: topic.title,
            description: topic.description,
            created_at: topic.created_at,
        };

        res.status(200).send(response);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a topic by custom ID
exports.deleteTopic = async (req, res) => {
    const topicId = req.params.id; // Assuming the ID is passed as a URL parameter
    try {
        const topic = await topicService.deleteTopicById(topicId);
        if (!topic) {
            return res.status(404).send({ message: 'Topic not found' });
        }
        res.status(200).send({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
