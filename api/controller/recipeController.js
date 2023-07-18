const { response } = require('../app');
const { recipes, units } = require('../db/db.json');
const { updateJSON } = require('../utils/dataManip');

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

exports.deleteOneRecipe= ((req, res) => {
    const recipeId = req.params.id; 
    recipes.forEach(countries => {
        for(let i = 0; i < countries.recipes.length; i++) {
            if (countries.recipes[i].id === recipeId) {
                countries.recipes.splice(i,1);
                updateJSON({recipes});
            }
        }
    });
    res.status(200).end();
})