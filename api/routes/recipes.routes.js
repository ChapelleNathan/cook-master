const { getAllRecipes} = require('../controller/recipeController');

const router = require('express').Router();

router.get('/api/recipes', getAllRecipes)

module.exports = router;