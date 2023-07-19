const { randomUUID } = require('crypto');
const db = require("../db/db.json");
const { updateJSON } = require('../utils/dataManip');
const { recipeVerify } = require('../utils/verif');

exports.createRecipeCtrl = (req, res) => {
    
    // query verification
    if(! db.gastronomy.hasOwnProperty(req.query.gastronomy) ){
        res.status(400).send("QueryString de requête incorrect");
        return;
    }

    const verified = recipeVerify(req,db)
    if(Object.keys(verified).length === 0){
        res.status(400).send("Corps de requête incorrect");
        return;
    }
    
    const recipe = { id: randomUUID(), ...verified};
    
    //append and update db
    //
    const gastroI =db.recipes.findIndex(gastro=>gastro.name.toLowerCase() == db.gastronomy[req.query.gastronomy].name)
    if(gastroI == -1){
        db.recipes.push({name:db.gastronomy[req.query.gastronomy].name,recipes:[recipe]})
    }else{
        db.recipes[gastroI].recipes.push(recipe)
    }
    updateJSON(db);

    res.status(200).send(recipe);

}

exports.modifRecipeCtrl = (req, res) => {
    console.log(req.body);
    // body verification
    if(! db.gastronomy.hasOwnProperty(req.body.gastronomy) ){
        res.status(400).send("QueryString de requête incorrect");
        return;
    }
    const verified = recipeVerify(req,db)
    if(Object.keys(verified).length === 0){
        res.status(400).send("Corps de requête incorrect");
        return;
    }
    console.log("Avant recipe");
    console.log(req.params.id);
    const recipe = { id: req.params.id, ...verified};
    console.log("Après recipe");
    //append and update db
    //
    console.log("Avant init");
    
    const gastroI = db.recipes.findIndex(gastro=>gastro.name.toLowerCase() == db.gastronomy[req.body.gastronomy].name)
    console.log(gastroI);
    console.log("Après init");
    if(gastroI != -1){
        console.log(recipe);
        console.log(db.recipes[gastroI].recipes.findIndex(rec => recipe.id == rec.id));
        const recipeId = db.recipes[gastroI].recipes.findIndex(rec => recipe.id == rec.id)
        db.recipes[gastroI].recipes[recipeId] = recipe;
        console.log("Modif faite:");
    }else{
        return res.status(400).send("QueryString de requête incorrect");
    }
    console.log("Avant update");
    updateJSON(db);
    console.log(db);

    res.status(200).send(recipe);

}

exports.getConstCtrl = (req,res)=>{

    const constant = {
        gastronomy: Object.entries(db.gastronomy).map(([key,value])=>{
            return {id:key,name:value.name,alias:value.alias}
        }),
        units: Object.entries(db.units).map(([key,value])=>{
            return {id:key,name:value.name,alias:value.alias}
        })
    }
    res.status(200).send(constant)
}
