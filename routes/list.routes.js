var express = require('express');
var router = express.Router();

//require middleware

const List = require('../models/list.models');

router.get('/list-home', (req, res, next) => {
    res.render('list-views/list-home.hbs') 
})

router.get('/add-list', (req, res, next) => {
    res.render('list-views/add-list.hbs')
});

router.get('/all-lists', (req, res, next) => {
    res.render('list-views/all-lists.hbs')
})

module.exports = router;