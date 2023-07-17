const express = require('express');
const router = express.Router();
const { resolve } = require('path')

const { createRecipeCtrl } = require('../controller/api.ctrl');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(resolve('public','html', 'index.html'));
});

router.get('*', (requ, res) => {
  res.status(404).sendFile(resolve('public', 'html' ,'index.html'))
});

router.post("/recipes",createRecipeCtrl );


module.exports = router;
