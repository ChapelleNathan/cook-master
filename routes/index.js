const express = require('express');
const router = express.Router();
const { resolve } = require('path')

const { createRecipeCtrl, getConstCtrl, modifRecipeCtrl } = require('../controller/api.ctrl');
const { getAllIngredientsNameCtrl } = require('../controller/ingredientsController');

router.post("/recipes",createRecipeCtrl );
router.patch("/recipes/:id",modifRecipeCtrl );

router.get("/constant",getConstCtrl);
router.get("/ingredients",getAllIngredientsNameCtrl);


/* GET home page. */
router.get('*', (req, res) => {
  res.sendFile(resolve('public', 'html' ,'index.html'))
});




module.exports = router;
