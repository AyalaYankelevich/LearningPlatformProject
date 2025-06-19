const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const adminController = require('../controllers/adminController');

router.get('/users', authenticateToken, adminController.getAllUsers);                  // Route to get all users
router.get('/users/:id/prompts', authenticateToken, adminController.getUserPrompts);  // Route to get prompts for a specific user

module.exports = router;
