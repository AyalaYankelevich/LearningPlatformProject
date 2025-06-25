const express = require('express');
const { generateCompletionHandler } = require('../controllers/gptController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// send-question to GPT
router.post('/send-question', authenticateToken, generateCompletionHandler);

module.exports = router;
