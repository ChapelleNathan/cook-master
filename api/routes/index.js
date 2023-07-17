const express = require('express');
const router = express.Router();
const { resolve } = require('path')

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(resolve('public','html', 'index.html'));
});

router.get('*', (requ, res) => {
  res.status(404).sendFile(resolve('public', 'html' ,'index.html'))
});


module.exports = router;
