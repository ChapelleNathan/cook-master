
const { getAllRecipes, getRecipe, getAllUnits} = require('../controller/recipeController');

const router = require('express').Router();

router.get('/api/recipes', getAllRecipes);
router.get('/api/recipe', getRecipe);
router.get('/api/units', getAllUnits);


module.exports = router;