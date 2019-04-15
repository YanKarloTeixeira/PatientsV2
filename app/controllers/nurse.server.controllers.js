const mongoose = require("mongoose");
const Nurse = require('../models/nurse.server.model');
// const Nurse = mongoose.model("Nurse");
// const Patient = mongoose.model("Patient");
var express = require('express');
// var router = express.Router();
// var passport = require('../helpers/strategy')
var { userAuthenticated } = require('../../helpers/authentication');
var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');




exports.NewNurse = function (req, res, next) {
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
        if (errors.length > 0) {

            res.render('nurse/new', {
                errors: errors,
                name: req.body.name,
                email: req.body.email,
                username: req.body.username
            });
        }
        else {

            Nurse.findOne({ email: req.body.email }).then(nurse => {

                if (!nurse) {
                    Nurse.findOne({ username: req.body.username }).then(users => {

                        if (!users) {
                            var newNurse = Nurse({
                                name: req.body.name,
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password

                            });
                            bcrypt.genSalt(10, (err, salt) => {

                                bcrypt.hash(newNurse.password, salt, (err, hash) => {
                                    newNurse.password = hash;
                                    newNurse.save().then(
                                        saved => {
                                            req.flash('success_message', 'User registered successfuly');
                                            res.redirect('/nurse/login');
                                        }
                                    ).catch()
                                });

                            })
                        }
                        else {

                            req.flash('error_message', 'UserName Already Exists');
                            res.render('nurse/new', {
                                name: req.body.name,
                                email: req.body.email,
                                username: req.body.username,
                                error_message: req.flash('error_message')
                            });
                        }
                    })


                }
                else {

                    req.flash('error_message', 'Email Already Exists');
                    res.render('nurse/new', {
                        name: req.body.name,
                        email: req.body.email,
                        username: req.body.username,
                        error_message: req.flash('error_message')
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    else {
        res.redirect('/nurse/index');
    }

};