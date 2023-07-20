
/**
 * 
 * @param {*} data a recipe object to verify and clean 
 * @param {*} db copy of the database to access constant
 * @returns a recipe object containing only the necessary data 
 *          or if the verification fail {}
 */
exports.recipeVerify = (data,db)=>{
    const recipe = { title: "", ingredients: [] };

    //title
    
    recipe.title = data.body.title
    if (typeof recipe.title !== typeof "" ||
        recipe.title.length == 0) {
        return {};
    }

    //ingredients

    if (!Array.isArray(data.body.ingredients) ||
        data.body.ingredients.length < 1) {
        return {};
    }
    for (let ingredientString of data.body.ingredients) {
        const ingredient=JSON.parse(ingredientString)
        const ingr = { name: "", quantity: 0, unit: "" };

        //ingredient.name
        ingr.name = ingredient["name"]
        if (typeof ingr.name !== typeof "" ||
            ingr.name.length == 0) {

            return {};
        }

        //ingredient.quantity
        ingr.quantity = ingredient.quantity;

        if (typeof ingr.quantity !== typeof "" ||
            ingr.quantity< 0) {

            return {};
        }

        //ingredient.unit
        
        if(typeof ingredient.unit !== typeof "" ||
            ! (ingredient.unit in db.units) ){

                return {};
        }
        ingr.unit = db.units[ingredient.unit].name
        recipe.ingredients.push(ingr)
    }
    return recipe
}