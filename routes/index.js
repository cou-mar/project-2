var express = require('express');
var router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: `the wanderer's guide` });
});

router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('main.hbs')
});

module.exports = router;