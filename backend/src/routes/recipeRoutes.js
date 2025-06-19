// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware
const recipeController = require('../controllers/recipeController');

// Create a new recipe
router.post('/recipes', authenticateToken, recipeController.createRecipeController);

// Get all recipes for the authenticated user
router.get('/recipes', authenticateToken, recipeController.getRecipesByUserIdController);

// Update a recipe by ID for the authenticated user
router.put('/recipes/:id', authenticateToken, recipeController.updateRecipeController);

// Delete a recipe by ID for the authenticated user
router.delete('/recipes/:id', authenticateToken, recipeController.deleteRecipeController);


module.exports = router;
