const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmin);
router.get('/users', authenticateToken, adminController.getAllUsers); 
 router.get('/prompts', authenticateToken, adminController.getAllPrompts);  
router.get('/users/:id/prompts', authenticateToken, adminController.getUserPrompts);  // Route to get prompts for a specific user
router.get('/prompts/:id/:categoryId', authenticateToken, adminController.getFilteredPrompts);
module.exports = router;
