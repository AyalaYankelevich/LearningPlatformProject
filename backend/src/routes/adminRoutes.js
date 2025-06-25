const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Create a new admin
router.post('/', adminController.createAdmin);

// Get all users
router.get('/users', authenticateToken, adminController.getAllUsers);

// Get a user's prompts
router.get('/userPrompts/:id', authenticateToken, adminController.getPromptsByUser);


module.exports = router;
