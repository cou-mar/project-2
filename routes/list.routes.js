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
    if(!req.body.title || !req.body.content || (Array.isArray(req.body.content) && !req.body.content.join(''))){
        res.render('list-views/add-list.hbs', {message: 'please add a title and at least one list item before submitting'})
        return;
    }
    
    List.create({
        title: req.body.title,
        content: req.body.content,
        user: req.session.user._id
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
    List.find({
        user: req.session.user._id
    })
    .then((foundLists) => {
        console.log(foundLists)
        res.render('list-views/all-lists.hbs', {foundLists})
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get("/:id", (req, res, next) => {
    List.findById(req.params.id)
      .then((foundOneList) => {
        console.log(foundOneList)
        res.render('list-views/view-one.hbs', foundOneList);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

module.exports = router;