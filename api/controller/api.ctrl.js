const { randomUUID } = require('crypto');
const db = require("../db/db.json");
const { updateJSON } = require('../utils/dataManip');
const { recipeVerify } = require('../utils/verif');

exports.createRecipeCtrl = (req, res) => {
    
    // query verification
    if(typeof req.query.gastronomy!== typeof String){
        res.status(400).send("QueryString de requête incorrect");
        return;
    }

    const verified = recipeVerify(req.body,db)
    if(Object.keys(verified).length === 0){
        res.status(400).send("Corps de requête incorrect");
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

exports.getConstCtrl = (req,res)=>{

    const constant = {
        gastronomy: Object.entries(db.gastronomy).map(([key,value])=>{
            return {id:key,alias:value.alias}
        }),
        units: Object.entries(db.units).map(([key,value])=>{
            return {id:key,alias:value.alias}
        })
    }
    res.status(200).send(constant)
}