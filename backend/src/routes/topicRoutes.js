const express = require('express');
const topicController = require('../controllers/topicController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new topic
router.post('/', authenticateToken, topicController.createTopic);

// Get all topics
router.get('/', authenticateToken, topicController.getAllTopics);

// Get a topic by ID
router.get('/:id', authenticateToken, topicController.getTopicById);

// Update a topic by ID
router.put('/:id', authenticateToken, topicController.updateTopic);

// Delete a topic by ID
router.delete('/:id', authenticateToken, topicController.deleteTopic);

module.exports = router;
