// services/recipeService.js

exports.parseRecipeString = async (recipeString) => {
    const recipe = {};

    // Use regex to extract the title, ingredients, instructions, and nutritional benefits
    const titleMatch = recipeString.match(/### (.+?)\n/);
    if (titleMatch) {
        recipe.title = titleMatch[1].trim();
    }

    const ingredientsMatch = recipeString.match(/#### Ingredients:\n([\s\S]+?)#### Instructions:/);
    if (ingredientsMatch) {
        recipe.ingredients = ingredientsMatch[1].trim().split('\n- ').slice(1).map(ingredient => ingredient.trim());
    }

    const instructionsMatch = recipeString.match(/#### Instructions:\n([\s\S]+?)### Nutritional Benefits:/);
    if (instructionsMatch) {
        recipe.instructions = instructionsMatch[1].trim().replace(/\n\d+\.\s/g, ''); // Remove step numbers
    }

    // Extract nutritional information if available
    const nutritionMatch = recipeString.match(/### Nutritional Benefits:\n([\s\S]+)/);
    recipe.nutritionInfo = {};
    if (nutritionMatch) {
        const nutritionParts = nutritionMatch[1].trim().split('\n- ').map(item => item.trim());
        nutritionParts.forEach(nutrition => {
            const [key, value] = nutrition.split(':').map(item => item.trim());
            if (key && value) {
                recipe.nutritionInfo[key.toLowerCase()] = parseFloat(value.replace(/[^\d.-]/g, '')); // Remove non-numeric characters
            }
        });
    }

    return recipe;
};

// Create a new recipe
exports.createRecipe = async (recipeData) => {
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save(); // Save to database
    return newRecipe;
};

// Get all recipes for the authenticated user
exports.getRecipesByUserId = async (userId) => {
    return await Recipe.find({ userId }); // Fetch all recipes for the user
};

// Update a recipe by ID for the authenticated user
exports.updateRecipe = async (id, recipeData, userId) => {
    const existingRecipe = await Recipe.findOne({ _id: id, userId });
    
    if (!existingRecipe) {
        throw new Error('Recipe not found or unauthorized');
    }

    return await Recipe.findByIdAndUpdate(id, recipeData, { new: true });
};

// Delete a recipe by ID for the authenticated user
exports.deleteRecipe = async (id, userId) => {
    const existingRecipe = await Recipe.findOne({ _id: id, userId });
    
    if (!existingRecipe) {
        throw new Error('Recipe not found or unauthorized');
    }

    await Recipe.findByIdAndDelete(id);
};

