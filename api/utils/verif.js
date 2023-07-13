exports.recipeVerify = (req,res,db)=>{
    const recipe = { title: "", ingredients: [] };

    //title
    recipe.title = req.body.title
    if (typeof recipe.tile !== typeof String ||
        recipe.title.length == 0) {

        res.status(400).send("Corps de requête incorrect");
        return {};
    }

    //ingredients
    if (!Array.isArray(body.ingredients) ||
        body.ingredients.length == 0) {

        res.status(400).send("Corps de requête incorrect");
        return {};
    }
    for (let ingredient of ingredients) {
        const ingr = { name: "", quantity: 0, unit: "" };

        //ingredient.name
        ingr.name = ingredient.name
        if (typeof ingr.name !== typeof String ||
            ingr.name.length == 0) {

            res.status(400).send("Corps de requête incorrect");
            return {};
        }

        //ingredient.quantity
        ingr.quantity = ingredient.quantity;
        if (typeof ingr.quantity !== typeof Number ||
            ingr.quantity== 0) {

            res.status(400).send("Corps de requête incorrect");
            return {};
        }

        //ingredient.unit
        ingr.unit = ingredient.unit
        if(typeof ingr.unit === typeof String ||
            ! db.units.include(ingr.unit)){
                res.status(400).send("Corps de requête incorrect");
                return {};
        }
        recipe.ingredients.push(ingr)
    }

    return recipe
}