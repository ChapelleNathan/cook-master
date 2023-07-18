const { recipes, units } = require('../db/db.json');

exports.getAllRecipes = ((req, res) => {
    res.status(200).json(recipes);
})

exports.getRecipe = ((req, res) => {
    const recipeId = req.query.id;
    let recipe = undefined;
    recipes.forEach(countries => {
        recipe = countries.recipes.find(recipe => recipeId == recipe.id);
        if (recipe) {
            res.status(200).json(recipe);
        }
    });
    res.status(404).end(); 
})

exports.getAllUnits = ((req, res) => {
    res.status(200).json(units);
})