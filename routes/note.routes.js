var express = require('express');
var router = express.Router();

//require middleware

const Note = require('../models/note.models');

router.get('/note-home', (req, res, next) => {
    res.render('note-views/note-home.hbs') 
})

router.get('/add-note', (req, res, next) => {
    res.render('note-views/add-note.hbs')
});

//router.post for add-note

router.get('/all-notes', (req, res, next) => {
    res.render('note-views/all-notes.hbs')
})

module.exports = router;