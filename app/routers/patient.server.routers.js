const patient = require("../controllers/patient.server.controllers");
const passport = require("passport");
var express = require('express');
var router = express.Router();
var { userAuthenticated1 } = require('../../helpers/authentication1');
var { userAuthenticated3 } = require('../../helpers/authentication3');
var { userAuthenticated } = require('../../helpers/authentication');
// var passport = require('../helpers/strategy')
// const bcrypt = require('bcryptjs');
const Patient = require('../models/patient.server.model');
const Nurse = require('../models/nurse.server.model');
var cors = require('cors')
const exphbs = require('express-handlebars');

module.exports = function (app) {

    app.use(cors());
    // app.use('/patient', patientRouter);

    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'home';
        next();
    });


    router.get('/symptoms', userAuthenticated1, function (req, res, next) {
        res.render('patient/symptoms');
    });
    router.get('/index', userAuthenticated1, function (req, res, next) {
        Patient.findOne({ _id: req.user.id }).then(patient => {
            res.render('patient/index', { patient: patient });
        })
    });



    router.get('/', userAuthenticated1, function (req, res, next) {
        res.redirect('index');
    });

    /* GET Signup page. */
    router.get('/new', function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.render('patient/new');
        }
        else {
            res.redirect('/patient/index');
        }
    });

    // Register Proccess
    router.post('/new', patient.NewPatient);
    // function (req, res, next) {
    //     if (!req.isAuthenticated()) {

    //         var errors = [];
    //         if (!req.body.name) {

    //             errors.push({
    //                 messages: 'Name is required'
    //             });
    //         }
    //         if (!req.body.email) {
    //             errors.push({ messages: 'Email is required' })
    //         }

    //         if (!req.body.username) {
    //             errors.push({ messages: 'User Name is required' })
    //         }
    //         if (!req.body.password) {
    //             errors.push({ messages: 'Password is required' })
    //         }
    //         if (req.body.password != req.body.password2) {
    //             errors.push({ messages: 'Password Mismatch' })
    //         }

    //         if (!req.body.gender) {
    //             errors.push({ messages: 'Gender is required' })
    //         }

    //         if (!req.body.age) {
    //             errors.push({ messages: 'Age is required' })
    //         }
    //         if (errors.length > 0) {

    //             res.render('patient/new', {
    //                 errors: errors,
    //                 name: req.body.name,
    //                 email: req.body.email,
    //                 username: req.body.username,
    //                 gender: req.body.gender,
    //                 age: req.body.age
    //             });
    //         }
    //         else {

    //             Patient.findOne({ email: req.body.email }).then(patient => {

    //                 if (!patient) {
    //                     Patient.findOne({ username: req.body.username }).then(users => {

    //                         if (!users) {
    //                             var newPatient = Patient({
    //                                 name: req.body.name,
    //                                 username: req.body.username,
    //                                 email: req.body.email,
    //                                 password: req.body.password,
    //                                 age: req.body.age,
    //                                 gender: req.body.gender,

    //                             });
    //                             bcrypt.genSalt(10, (err, salt) => {

    //                                 bcrypt.hash(newPatient.password, salt, (err, hash) => {
    //                                     newPatient.password = hash;
    //                                     newPatient.save().then(
    //                                         saved => {

    //                                             req.flash('success_message', 'Patient registered successfuly');
    //                                             res.redirect('/patient/login');
    //                                         }
    //                                     ).catch()
    //                                 });

    //                             })
    //                         }
    //                         else {

    //                             req.flash('error_message', 'UserName Already Exists');
    //                             res.render('patient/new', {
    //                                 name: req.body.name,
    //                                 email: req.body.email,
    //                                 username: req.body.username,
    //                                 age: req.body.age,
    //                                 error_message: req.flash('error_message')
    //                             });
    //                         }
    //                     })


    //                 }
    //                 else {

    //                     req.flash('error_message', 'Email Already Exists');
    //                     res.render('patient/new', {
    //                         name: req.body.name,
    //                         email: req.body.email,
    //                         username: req.body.username,
    //                         age: req.body.age,
    //                         error_message: req.flash('error_message')
    //                     });
    //                 }
    //             }).catch(err => {
    //                 console.log(err);
    //             })
    //         }
    //     }

    //     else {
    //         res.redirect('/patient/index');
    //     }
    // });

    //get login page
    router.get('/login', function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.render('patient/login');
        }
        else {
            res.redirect('/patient/index');
        }
    })

    //login process
    router.post('/login', function (req, res, next) {
        if (!req.isAuthenticated()) {
            passport.authenticate('patient-local', {
                successRedirect: 'index',
                failureRedirect: 'login',
                failureFlash: true
            })(req, res, next);
        }
        else {
            res.redirect('/patient/index');
        }


    });

    router.get('/logout', function (req, res, next) {
        req.logout();
        req.flash('success', 'You are logged out');
        res.redirect('login');
    })

    router.get('/:id', userAuthenticated, function (req, res, next) {
        Patient.findOne({ _id: req.params.id }).then(patient => {
            res.render('patient/show', { patient: patient });
        })
    })


    router.get('/signs/:id', userAuthenticated3, function (req, res, next) {
        Patient.findOne({ _id: req.params.id }).then(patient => {
            res.render('patient/sign', { patient: patient });
        })
    })


    router.post('/signs/:id', userAuthenticated3, function (req, res, next) {
        if (req.body.empty) {
            req.flash('error_message', 'All fields are empty');
            res.render('patient/new', {
                error_message: req.flash('error_message')
            });
        }
        else {
            Patient.findOne({ _id: req.params.id }).then(patient => {
                patient.visits.push({
                    blood_pressure: req.body.bp,
                    heart_rate: req.body.hr,
                    body_temperature: req.body.temp,
                    respiratory_rate: req.body.rr,
                    time: getDateTime(),
                    nurse: req.body.nurse
                })

                patient.save().then(saved => {
                    req.flash('success', 'Vital Signs Added');
                    res.redirect("/patient/" + patient.id);
                }).catch(err => {
                    console.log(err);
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })

    router.get('/sign-list/:id', userAuthenticated3, function (req, res, next) {
        Patient.findOne({ _id: req.params.id }).then(patients => {
            res.render('patient/sign-list', { visits: patients.visits });
        }).catch(err => {
            console.log(err)
        })
    })



    
 

}