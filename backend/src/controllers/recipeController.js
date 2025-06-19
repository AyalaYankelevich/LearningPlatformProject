const { parseRecipeString, createRecipe, getRecipesByUserId, updateRecipe, deleteRecipe } = require('../services/recipeService');

// Create a new recipe
exports.createRecipeController = async (req, res) => {
    try {
        const recipeResponse = req.body.response; // Assuming the response is sent in the request body
        const recipeData = parseRecipeString(recipeResponse);
        
        // Add userId from the request
        recipeData.userId = req.user._id; // Ensure you have user authentication in place

        const newRecipe = await createRecipe(recipeData);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create recipe' });
    }
};

// Get all recipes for the authenticated user
exports.getRecipesByUserIdController = async (req, res) => {
    try {
        const recipes = await getRecipesByUserId(req.user._id); // Fetch all recipes for the user
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve recipes' });
    }
};

// Update a recipe by ID for the authenticated user
exports.updateRecipeController = async (req, res) => {
    const { id } = req.params; // This is the recipe ID
    const recipeResponse = req.body.response; // Assuming the response is sent in the request body
    const recipeData = parseRecipeString(recipeResponse);

    try {
        const updatedRecipe = await updateRecipe(id, recipeData, req.user._id);
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a recipe by ID for the authenticated user
exports.deleteRecipeController = async (req, res) => {
    const { id } = req.params; // This is the recipe ID
    try {
        await deleteRecipe(id, req.user._id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
