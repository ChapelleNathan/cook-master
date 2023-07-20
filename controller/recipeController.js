const db = require('../db/db.json');
const { updateJSON } = require('../utils/dataManip');


exports.getRecipes = ((req, res) => {
    let filteredRecipes = structuredClone(db.recipes);
    if (!filteredRecipes) {
        res.status(404).end();
    }
    if (typeof req.query.gastronomy != "undefined") {
        filteredRecipes = filterGastronomy(filteredRecipes, req.query.gastronomy)
    }
    if (typeof req.query.ingredient != "undefined") {
        filteredRecipes = filterIngredient(filteredRecipes, req.query.ingredient)
    }
    res.status(200).json(filteredRecipes);
})

exports.getRecipe = ((req, res) => {
    const recipeId = req.query.id;
    let recipe = undefined;
    db.recipes.forEach(countries => {
        recipe = countries.recipes.find(recipe => recipeId == recipe.id);
        if (recipe) {
            res.status(200).json({ gastronomy: countries.name, ...recipe });
        }
    });
    res.status(404).end();
})




/**
 * filter the unwanted gastronomy
 * @param {Object} data recipes object grouped by gastronomy
 * @param {string} filter name of the gastronomy to filter
 * @returns the recipes of the wanted gastronomy while preserving the structure of data
 */
function filterGastronomy(data, filter) {
    return data.filter(gastronomy => {
        return gastronomy.name == filter
    });
}

/**
 * filter recipes with unwanted ingredient
 * @param {Object} data recipes object grouped by gastronomy
 * @param {string} filter name of the ingredient to filter
 * @returns the recipes with the wanted ingredient while preserving the structure of data
 */
function filterIngredient(data, filter) {
    return data.map(gastronomy => {
        gastronomy.recipes = gastronomy.recipes.filter(recipe => {
            return 0 != recipe.ingredients.filter(ingredient => {
                return ingredient.name == filter;
            }).length
        })
        return gastronomy;
    });
}



exports.getAllUnits = ((req, res) => {
    res.status(200).json(db.units);
})

exports.deleteOneRecipe = ((req, res) => {
    const recipeId = req.params.id;

    for (const countries of db.recipes) {
        for (let i = 0; i < countries.recipes.length; i++) {
            if (countries.recipes[i].id === recipeId) {
                countries.recipes.splice(i, 1);
                updateJSON(db);
                res.status(200).end();
                return;
            }
        }
    }
    res.status(404).end();
})
