var express = require('express');
var router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const List = require('../models/list.models');

router.get('/list-home', isLoggedIn, (req, res, next) => {
    res.render('list-views/list-home.hbs') 
});

router.get('/add-list', isLoggedIn, (req, res, next) => {
    res.render('list-views/add-list.hbs')
});

router.post('/add-list', isLoggedIn, (req, res, next) => {
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

router.get('/all-lists', isLoggedIn, (req, res, next) => {
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

router.get('/:id', isLoggedIn, (req, res, next) => {
    List.findById(req.params.id)
      .then((foundOneList) => {
        console.log(foundOneList)
        res.render('list-views/view-list.hbs', foundOneList);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });

  router.get('/:id/edit-list', isLoggedIn, (req, res, next) => {
    List.findById(req.params.id)
    .then((foundOneList) => {
        console.log('THIS IS THE LIST I WANT TO EDIT');
        res.render('list-views/edit-list.hbs', foundOneList)
    })
    .catch((err) => {
        console.log(err)
    })
  });

  router.post('/:id/edit-list', isLoggedIn, (req, res, next) => {
    List.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    },
    {new: true}
        //this will show the object after the changes have been made
    )
    .then((updatedList) => {
        console.log('CHANGED LIST:', updatedList);
        res.redirect('/list/all-lists')
    })
    .catch((err) => {
        console.log(err)
    })
  });

  router.post('/:id/delete-list', isLoggedIn, (req, res, next) => {
    List.findById(req.params.id)
    .then((foundOneList) => {
        foundOneList.delete()
        res.redirect('/list/all-lists')
    })
    .catch((err) => {
        console.log(err)
    })
  });

module.exports = router;