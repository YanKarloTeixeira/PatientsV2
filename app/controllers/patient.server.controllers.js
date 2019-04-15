// const passport = require("passport");
const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
// var express = require('express');
// var router = express.Router();
// var { userAuthenticated1 } = require('../helpers/authentication1');
// var { userAuthenticated3 } = require('../helpers/authentication3');
// var { userAuthenticated } = require('../helpers/authentication');

const bcrypt = require('bcryptjs');


exports.NewPatient = function (req, res, next) {
    if (!req.isAuthenticated()) {

        var errors = [];
        if (!req.body.name) {

            errors.push({
                messages: 'Name is required'
            });
        }
        if (!req.body.email) {
            errors.push({ messages: 'Email is required' })
        }

        if (!req.body.username) {
            errors.push({ messages: 'User Name is required' })
        }
        if (!req.body.password) {
            errors.push({ messages: 'Password is required' })
        }
        if (req.body.password != req.body.password2) {
            errors.push({ messages: 'Password Mismatch' })
        }

        if (!req.body.gender) {
            errors.push({ messages: 'Gender is required' })
        }

        if (!req.body.age) {
            errors.push({ messages: 'Age is required' })
        }
        if (errors.length > 0) {

            res.render('patient/new', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                gender: req.body.gender,
                age: req.body.age
            });
        }
        else {

            Patient.findOne({ email: req.body.email }).then(patient => {

                if (!patient) {
                    Patient.findOne({ username: req.body.username }).then(users => {

                        if (!users) {
                            var newPatient = Patient({
                                name: req.body.name,
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password,
                                age: req.body.age,
                                gender: req.body.gender,

                            });
                            bcrypt.genSalt(10, (err, salt) => {

                                bcrypt.hash(newPatient.password, salt, (err, hash) => {
                                    newPatient.password = hash;
                                    newPatient.save().then(
                                        saved => {

                                            req.flash('success_message', 'Patient registered successfuly');
                                            res.redirect('/patient/login');
                                        }
                                    ).catch()
                                });

                            })
                        }
                        else {

                            req.flash('error_message', 'UserName Already Exists');
                            res.render('patient/new', {
                                name: req.body.name,
                                email: req.body.email,
                                username: req.body.username,
                                age: req.body.age,
                                error_message: req.flash('error_message')
                            });
                        }
                    })


                }
                else {

                    req.flash('error_message', 'Email Already Exists');
                    res.render('patient/new', {
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        age: req.body.age,
                        error_message: req.flash('error_message')
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    else {
        res.redirect('/patient/index');
    }

};
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
