var express = require('express');
var router = express.Router();

//require middleware

const List = require('../models/list.models');

router.get('/list-home', (req, res, next) => {
    res.render('list-views/list-home.hbs') 
});

router.get('/add-list', (req, res, next) => {
    res.render('list-views/add-list.hbs')
});

router.post('/add-list', (req, res, next) => {
    // console.log("Checking values:", req.body.title, req.body.content)
    if(!req.body.title || !req.body.content || !req.body.content.join('')){
        res.render('list-views/add-list.hbs', {message: 'please add a title and at least one list item before submitting'})
        return;
    }
    
    List.create({
        title: req.body.title,
        content: req.body.content
    })
    .then((createdList) => {
        console.log('MY NEW LIST', createdList)
        res.redirect('/list/all-lists')
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/all-lists', (req, res, next) => {
    res.render('list-views/all-lists.hbs')
});

module.exports = router;