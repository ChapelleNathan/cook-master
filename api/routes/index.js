const express = require('express');
const router = express.Router();
const { resolve } = require('path')

/* GET home page. */
router.get('/recipes', function(req, res) {
  res.sendFile(resolve('public','html', 'index.html'));
});


module.exports = router;
