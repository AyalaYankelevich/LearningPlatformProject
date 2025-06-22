const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const subTopicController = require('../controllers/subTopicController');

// Create a new sub-topic
router.post('/', authenticateToken, subTopicController.createSubTopic);

// Get all sub-topics
router.get('/',authenticateToken, subTopicController.getAllSubTopics);

// Get all sub-topics by topicId
router.get('/topic/:topicId', authenticateToken, subTopicController.getSubTopicsByTopicId);

// Get a sub-topic by ID
router.get('/:id',authenticateToken, subTopicController.getSubTopicById);

// Update a sub-topic by ID
router.put('/:id',authenticateToken, subTopicController.updateSubTopic);

// Delete a sub-topic by ID
router.delete('/:id',authenticateToken, subTopicController.deleteSubTopic);

module.exports = router;
