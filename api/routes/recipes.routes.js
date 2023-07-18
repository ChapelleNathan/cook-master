

const { getRecipes, getRecipe} = require('../controller/recipeController');

const { getRecipes, getRecipe, getAllUnits} = require('../controller/recipeController');


const router = require('express').Router();


router.get('/api/recipes', getRecipes)

router.get('/api/recipe', getRecipe);
router.get('/api/units', getAllUnits);


module.exports = router;