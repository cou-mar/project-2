const isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.render('auth-views/login.hbs', {message: 'please log in before navigating the website'})
    } else{
        next()
    }
}

module.exports = isLoggedIn;