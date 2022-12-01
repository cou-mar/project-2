var express = require('express');
var router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const Note = require('../models/note.models');

router.get('/note-home', isLoggedIn, (req, res, next) => {
    res.render('note-views/note-home.hbs') 
});

router.get('/add-note', isLoggedIn, (req, res, next) => {
    res.render('note-views/add-note.hbs')
});

router.post('/add-note', isLoggedIn, (req, res, next) => {
if(!req.body.title || !req.body.content){
    res.render('note-views/add-note.hbs', {message: 'please add a title and some text before submitting'})
    return;
}

    Note.create({
        title: req.body.title,
        content: req.body.content,
        user: req.session.user._id
    })
    .then((createdNote) => {
        console.log('MY NEW NOTE', createdNote)
        res.redirect('/note/all-notes')
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/all-notes', isLoggedIn, (req, res, next) => {
    Note.find({
        user: req.session.user._id
    })
    .then((foundNotes) => {
        console.log(foundNotes)
        res.render('note-views/all-notes.hbs', {foundNotes})
    })
    .catch((err) => {
        console.log(err)
    })
});

router.get('/:id', isLoggedIn, (req, res, next) => {
    Note.findById(req.params.id)
    .then((foundOneNote) => {
        console.log(foundOneNote)
        res.render('note-views/view-note.hbs', foundOneNote);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
});

router.get('/:id/edit-note', isLoggedIn, (req, res, next) => {
    Note.findById(req.params.id)
    .then((foundOneNote) => {
        console.log('THIS IS THE NOTE I WANT TO EDIT');
        res.render('note-views/edit-note.hbs', foundOneNote)
    })
    .catch((err) => {
        console.log(err)
    })
});

router.post('/:id/edit-note', isLoggedIn, (req, res, next) => {
    Note.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    },
    {new: true}
    )
    .then((updatedNote) => {
        console.log('CHANGED NOTE:', updatedNote);
        res.redirect('/note/all-notes')
    })
    .catch((err) => {
        console.log(err)
    })
});

router.post('/:id/delete-note', isLoggedIn, (req, res, next) => {
    Note.findById(req.params.id)
    .then((foundOneNote) => {
        foundOneNote.delete()
        res.redirect('/note/all-notes')
    })
    .catch((err) => {
        console.log(err)
    })
});

module.exports = router;