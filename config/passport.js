var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

// const bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

        //validate
        // req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        // req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4}, 'Password must me atleast 4 characters Long');
        // check('email', 'Invalid Email').isEmail().withMessage('must be an email');
        // check('password', 'Invalid Password"').isLength({min: 5});

        //push errors
        // var errors = validationResult(req);

        const errors = req.validationErrors();
        console.log(errors);

        if (errors){

            var messages = [];

            errors.forEach(function(error){
                messages.push(error.msg);
            });

            return done(null, false, req.flash('error', messages));

        }

        User.findOne({email: email}, function (err, user) {

            if (err){
                return done(err);
            }
            if (user){
                return done(null, false, {message: 'Email already in use'});
            }
            var newUser = new User();
            newUser.email = email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err, result) {
                if (err) {
                    return done(err);
                }
                    req.flash('msg_success', 'You are logged in');

                return done(null, newUser);
            });
            // var newUser = new User({
            //
            //     email: email,
            //     password: User.encryptPassword(password),
            //     firstName: req.body.firstName,
            //     lastName: req.body.lastName
            //
            // });
            // newUser.save().then(function (user) {
            //     req.flash('msg_success', 'You are logged in');
            //
            //     return done(null, user);
            //
            // });
        })
    }
));

passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        // session: false
    },
    function(req, email, password, done) {

        //validate
        // req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
        // req.checkBody('password', 'Invalid Password').notEmpty.isLength({min:4});

        //push errors
        var errors = req.validationErrors();

        if (errors){

            var messages = [];

            errors.forEach(function(error){
                messages.push(error.msg);
            });

            return done(null, false, req.flash('error', messages));

        }

        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'No User Found'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Password Does not Match'});
            }
            req.flash('msg_success', 'You are logged in');
            return done(null, user);
        });
    }
));