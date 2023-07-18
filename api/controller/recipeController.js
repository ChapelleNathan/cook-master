const { recipes } = require('../db/db.json');

exports.getRecipes = ((req, res) => {
    const filteredRecipes = recipes
    if (req.query.gastronomy != "") {
        filteredRecipes.recipes = filterGastronomy(filteredRecipes.recipes,req.query.gastronomy)
    }
    if (req.query.ingredient != "") {
        filteredRecipes.recipes =filterIngredient(filteredRecipes.recipes,req.query.ingredient)
    }
    res.status(200).json(filteredRecipes);
})

/**
 * filter the unwanted gastronomy
 * @param {Object} data recipes object grouped by gastronomy
 * @param {string} filter name of the gastronomy to filter
 * @returns the recipes of the wanted gastronomy while preserving the structure of data
 */
function filterGastronomy(data,filter){
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
function filterIngredient(data,filter){
    return data.recipes.map(gastronomy=>{
        return gastronomy.recipes.filter(recipe=>{
            
            return 0 != recipe.ingredients.filter(ingredient=>{
                return ingredient.name == filter;
            }).length
        })
    });
}