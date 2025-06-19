const mongoose = require('mongoose');

// Recipe Schema
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the recipe
    ingredients: { type: [String], required: true }, // List of ingredients
    instructions: { type: String, required: true }, // Cooking instructions
    nutritionInfo: { // Optional nutritional information
        calories: { type: Number },
        protein: { type: Number },
        carbs: { type: Number },
        fats: { type: Number }
    },
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the recipe was created
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user who created the recipe
});

// Create Recipe Model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
