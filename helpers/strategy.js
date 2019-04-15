const Nurse = require('../models/nurse');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Patient = require('../models/patient');
const bcrypt = require('bcryptjs');

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

// Local Strategy
passport.use('nurse-local',new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {username:username};
    Nurse.findOne(query, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'No Nurse found'});
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Wrong password'});
            }
        });
    });
}));

passport.use('patient-local',new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {username:username};
    Patient.findOne(query, function(err, user){
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'No Patient found'});
        }

        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Wrong password'});
            }
        });
    });
}));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

passport.serializeUser(function(user, done) {
    let userGroup = "Nurse";
    let userPrototype =  Object.getPrototypeOf(user);

    if (userPrototype === Nurse.prototype) {
        userGroup = "Nurse";
    } else if (userPrototype === Patient.prototype) {
        userGroup = "Patient";
    }

    let sessionConstructor = new SessionConstructor(user.id, userGroup, '');
    done(null,sessionConstructor);
    //done(null, user.id);
});
//
// passport.deserializeUser(function(id, done) {
//     Patient.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

passport.deserializeUser(function(id, done) {
    if (id.userGroup == 'Nurse') {
        Nurse.findOne({
            _id: id.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
    } else if (id.userGroup == 'Patient') {
        Patient.findOne({
            _id: id.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
    }
});

module.exports = passport;