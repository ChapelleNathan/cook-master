const { recipes } = require('../db/db.json');

exports.getAllRecipes = ((req, res) => {
    res.status(200).json(recipes);
    console.log(recipes);
})

exports.getRecipe = ((req, res) => {
    res.status(200).json(recipe);
    console.log(recipe);
})