const { randomUUID } = require('crypto');
const { db } = require("../db/db.json");
const { updateJSON } = require('../utils/dataManip');
const { recipeVerify } = require('../utils/verif');

exports.createRecipeCtrl = (req, res) => {
    
    // query verification
    if(typeof req.query.gastronomy!== typeof String){
        res.status(400).send("QueryString de requête incorrect");
        return;
    }

    const verified = recipeVerify(req,res,db)
    if(Object.keys(verified).length === 0){
        return;
    }
    
    const recipe = { id: randomUUID(), ...verified};
    
    //append and update db
    //
    const gastroI =db.recipes.findIndex(gastro=>gastro.name.toLowerCase() == req.query.gastronomy.toLowerCase())
    if(gastroI == -1){
        db.recipes.push({name:req.query.gastronomy,recipes:[recipe]})
    }else{
        db.recipes[gastroI].recipes.push(recipe)
    }
    updateJSON(db);

    res.status(200).send(recipe);

}