var express = require('express');
var router = express.Router();

var passport = require('passport');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res) {

    var messages = req.flash('error');

    const hasErrors = messages.length > 0 ? true : false;

    res.render('user/login', {hasErrors: hasErrors});

});

router.get('/register', function (req, res) {

    var messages = req.flash('error');

    const hasErrors = messages.length > 0 ? true : false;

    res.render('user/register', {hasErrors: hasErrors});

});

router.post('/login', function (req, res, next) {

    passport.authenticate('local.signin', {

        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true

    })(req, res, next);

});

router.post('/register', function (req, res, next) {

    passport.authenticate('local.signup', {

        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true

    })(req, res, next);

});


router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
