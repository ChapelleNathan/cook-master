const { getAllRecipes, getRecipe} = require('../controller/recipeController');

const router = require('express').Router();

router.get('/api/recipes', getAllRecipes);
router.get('/api/recipe', getRecipe);

module.exports = router;