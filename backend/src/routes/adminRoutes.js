const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmin);
router.get('/users', authenticateToken, adminController.getAllUsers); 
router.get('/prompts', authenticateToken, adminController.getAllPrompts);  
router.get('/userPrompts/:id', authenticateToken, adminController.getPromptsByUser); 
router.get('/prompts/:id/:categoryId', authenticateToken, adminController.getFilteredPrompts);
module.exports = router;
