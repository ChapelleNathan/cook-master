
const { getAllRecipes, getRecipe} = require('../controller/recipeController');

const router = require('express').Router();


router.get('/api/recipes', getRecipes)

router.get('/api/recipe', getRecipe);


module.exports = router;