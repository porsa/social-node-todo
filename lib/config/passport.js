'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    auth = require('./env/auth-local.js'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));

//facebook
passport.use(new FacebookStrategy({
        clientID: auth.facebook.clientID,
        clientSecret: auth.facebook.clientSecret,
        callbackURL: auth.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("accessToken: "+accessToken);
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //No user was found... so create a new user with values from
            //Facebook (all the profile. stuff)
            var email;
            if(profile.emails[0].value === null) {
              email = "";
              console.log("no facebook email found!");
            }
            else {
              email = profile.emails[0].value;
            }

            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: email,
                    //username: profile.username,
                    provider: 'facebook',
                    //now in the future searching on User.findOne({'facebook.id': profile.id }
                    // will match because of this next line
                    facebook: profile._json

                });

                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }
        });
    }
));

module.exports = passport;