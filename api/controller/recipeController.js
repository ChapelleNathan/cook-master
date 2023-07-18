const { recipes } = require('../db/db.json');


exports.getRecipes = ((req, res) => {
    let filteredRecipes = structuredClone(recipes);
    if (typeof req.query.gastronomy != "undefined") {
        filteredRecipes= filterGastronomy(filteredRecipes,req.query.gastronomy)
    }
    if (typeof req.query.ingredient != "undefined") {
        filteredRecipes =filterIngredient(filteredRecipes,req.query.ingredient)
    }
    res.status(200).json(filteredRecipes);
    console.log(recipes);
})

exports.getRecipe = ((req, res) => {
    res.status(200).json(recipe);
    console.log(recipe);

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
    return data.map(gastronomy=>{
        gastronomy.recipes =gastronomy.recipes.filter(recipe=>{
            return 0 != recipe.ingredients.filter(ingredient=>{
                return ingredient.name == filter;
            }).length
        })
        return gastronomy;
    });
}



