const express = require('express');
const { generateCompletionHandler } = require('../controllers/gptController'); // Destructure the specific function
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Gpt route to generate content
router.post('/send-question', authenticateToken, generateCompletionHandler); // Use the specific function

module.exports = router;
