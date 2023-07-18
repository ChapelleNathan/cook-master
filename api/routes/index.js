const express = require('express');
const router = express.Router();
const { resolve } = require('path')

const { createRecipeCtrl, getConstCtrl } = require('../controller/api.ctrl');
const { getAllIngredientsNameCtrl } = require('../controller/ingredientsController');

router.post("/recipes",createRecipeCtrl );

router.get("/constant",getConstCtrl);
router.get("/ingredients",getAllIngredientsNameCtrl);


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(resolve('public','html', 'index.html'));
});

router.get('*', (requ, res) => {
  res.status(404).sendFile(resolve('public', 'html' ,'index.html'))
});




module.exports = router;
