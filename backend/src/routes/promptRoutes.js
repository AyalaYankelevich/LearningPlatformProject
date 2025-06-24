const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const promptController = require('../controllers/promptController');

// Create a new prompt
router.post('/', authenticateToken, promptController.createPromptController);

// Get all prompts
router.get('/', authenticateToken, promptController.getAllPromptsController);

// Get all prompts for the authenticated user
router.get('/id', authenticateToken, promptController.getPromptsByUserIdController);

// Update a prompt by ID for the authenticated user
router.put('/:id', authenticateToken, promptController.updatePromptController);

// Delete a prompt by ID for the authenticated user
router.delete('/:id', authenticateToken, promptController.deletePromptController);

module.exports = router;


