
const { getAllRecipes, getRecipe, getAllUnits, deleteOneRecipe} = require('../controller/recipeController');

const router = require('express').Router();

router.get('/api/recipes', getAllRecipes);
router.get('/api/recipe', getRecipe);
router.delete('/api/recipe/:id', deleteOneRecipe);
router.get('/api/units', getAllUnits);

module.exports = router;