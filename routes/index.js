var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'untitled' });
});

router.get('/main', (req, res, next) => {
  res.render('main.hbs')
});

module.exports = router;