
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
    recipe.title = data.title
    if (typeof recipe.title !== typeof String ||
        recipe.title.length == 0) {
        return {};
    }

    //ingredients
    if (!Array.isArray(data.ingredients) ||
        data.ingredients.length == 0) {
        return {};
    }
    for (let ingredient of data.ingredients) {
        const ingr = { name: "", quantity: 0, unit: "" };

        //ingredient.name
        ingr.name = ingredient.name
        if (typeof ingr.name !== typeof String ||
            ingr.name.length == 0) {

            return {};
        }

        //ingredient.quantity
        ingr.quantity = ingredient.quantity;
        if (typeof ingr.quantity !== typeof Number ||
            ingr.quantity== 0) {

            return {};
        }

        //ingredient.unit
        ingr.unit = ingredient.unit
        if(typeof ingr.unit === typeof String ||
            ! db.units.include(ingr.unit)){

                return {};
        }
        recipe.ingredients.push(ingr)
    }

    return recipe
}