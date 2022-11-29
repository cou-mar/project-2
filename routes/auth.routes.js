const express = require('express');
const router = express.Router();

const User = require('../models/user.models')

const bcryptjs = require('bcryptjs');

const saltRounds = 10;

//SIGN UP
router.get('/signup', (req, res, next) => {
    res.render('auth-views/signup.hbs')
})

router.post('/signup', (req, res, next) => {
    //ensuring each part of the form is filled out
    if(!req.body.name || !req.body.email || !req.body.password){
        //if each part of form is not filled out, then render sign up page again
        res.render('auth-views/signup.hbs', {message: 'please fill out each field before proceeding'})
        return;
    }

    const salt = bcryptjs.genSaltSync(saltRounds)
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

    //checking to see whether user already exists in DB
    User.findOne({email: req.body.email})
        .then((foundUser) => {
            //if a user is found, display message
            if(foundUser){
                res.render('auth-views/login.hbs', {message: 'you have already signed up! please log in'})
                return;
                //if no user found, proceed to create user with values inputted on form
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                //direct user to login page once values inputted
                .then(() => {
                    res.redirect('/auth/login')
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

//LOG IN
router.get('/login', (eq, res, next) => {
    res.render('auth-views/login.hbs')
})

router.post('/login', (req, res, next) => {
    if(!req.body.email || !req.body.password){
        res.render('auth-views/login.hbs', {message: 'both fields are required'})
        return;
    }
    User.findOne({email: req.body.email})
    .then((foundUser) => {
        if(!foundUser){
            res.render('auth-views/login.hbs', {message: 'this user does not exist'})
        } else {
            let correctPassword = bcryptjs.compareSync(req.body.password, foundUser.password);
            if(correctPassword){
                req.session.user = foundUser;
                res.render('main.hbs')
            } else {
                res.render('auth-views/login.hbs', {message: 'incorrect email or password provided'})
            }
        }
    })
})

//LOG OUT
router.get('/logout', (req, res, next) => {
    //this will clear the cookie from the DB and end the session
    req.session.destroy();
    res.render('auth-views/login.hbs', {message: 'you have successfully logged out. see you next time!'})
})

module.exports = router