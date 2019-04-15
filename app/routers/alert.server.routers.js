const alert = require("../controllers/alert.server.controllers");
const passport = require("passport");
var express = require('express');
var router = express.Router();
// var { userAuthenticated4 } = require('../helpers/authentication4');
// var { userAuthenticated } = require('../helpers/authentication');
var { userAuthenticated4 } = require('../../helpers/authentication4');
var { userAuthenticated } = require('../../helpers/authentication');
const Patient = require('../models/patient.server.model');
const Nurse = require('../models/nurse.server.model');
var cors = require('cors')

module.exports = function (app) {
    //app.use('/alert', alertRouter);
    // app.use(cors());

    app.use(cors());

    router.get('/', userAuthenticated, function (req, res, next) {
        res.render('alert/index');
    })

    router.get('/new/:id', userAuthenticated4, function (req, res, next) {
        res.render('alert/new-alert');
    })

    router.post('/send/:id', userAuthenticated4, alert.send);
    
    // function (req, res, next) {
    //     // Patient.findOne({ _id: req.params.id }).then(patient => {
    //     //     patient.alerts.push({
    //     //         blood_pressure: req.body.bp,
    //     //         body_temperature: req.body.temp,
    //     //         subject: req.body.subject,
    //     //         time: getDateTime(),
    //     //         description: req.body.desc
    //     //     })
    //     //     patient.save().then(saved => {
    //     //         req.flash('success', 'Alert Send');
    //     //         res.redirect("/patient/index");
    //     //     }).catch(err => {
    //     //         console.log(err)
    //     //     })
    //     // })
    // })




}