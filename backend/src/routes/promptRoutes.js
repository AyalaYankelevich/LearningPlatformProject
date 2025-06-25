const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const promptController = require('../controllers/promptController');

// Create a new prompt
router.post('/', authenticateToken, promptController.createPrompt);

// Get all prompts
router.get('/', authenticateToken, promptController.getAllPrompts);

// Get all prompts for the authenticated user
router.get('/id', authenticateToken, promptController.getPromptsByUserId);

// Update a prompt by ID for the authenticated user
router.put('/:id', authenticateToken, promptController.updatePrompt);

// Delete a prompt by ID for the authenticated user
router.delete('/:id', authenticateToken, promptController.deletePrompt);

module.exports = router;


