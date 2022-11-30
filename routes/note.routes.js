var express = require('express');
var router = express.Router();

//require middleware

const Note = require('../models/note.models');

router.get('/note-home', (req, res, next) => {
    res.render('note-views/note-home.hbs') 
});

router.get('/add-note', (req, res, next) => {
    res.render('note-views/add-note.hbs')
});

router.post('/add-note', (req, res, next) => {
if(!req.body.title || !req.body.content){
    res.render('note-views/add-note.hbs', {message: 'please add a title and some text before submitting'})
    return;
}

    Note.create({
        title: req.body.title,
        content: req.body.content
    })
    .then((createdNote) => {
        console.log('MY NEW NOTE', createdNote)
        res.redirect('/note/all-notes')
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/all-notes', (req, res, next) => {
    res.render('note-views/all-notes.hbs')
});

module.exports = router;