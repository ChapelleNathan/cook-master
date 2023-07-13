const express = require('express');
const { createRecipeCtrl } = require('../controller/api.ctrl');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/recipes",createRecipeCtrl );


module.exports = router;
