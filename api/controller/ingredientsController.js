const { recipes } = require('../db/db.json');


exports.getAllIngredientsNameCtrl = ((req, res) => {
    const ingredients ={ ingredients: [
        ...new Set(
            ...recipes.recipes.map(gastronomy => {
                return gastronomy.recipes.map(recipe=>{
                    return recipe.ingredients.map(ingredient=>ingredient.name.toLowerCase())
                })
            })
        )
    ].sort()};
    res.status(200).json(ingredients);
})