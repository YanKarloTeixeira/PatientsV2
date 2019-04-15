const mongoose = require("mongoose");
// const Alert = mongoose.model("Alert");
// const Patient = mongoose.model("Patient");
//const Alert = require('../app/models/alert.server.model');
const Patient = require('../models/patient.server.model');
// const Student = mongoose.model("Students");
// const passport = require("passport");

exports.send = function (req, res) {
    Patient.findOne({ _id: req.params.id }).then(patient => {
        patient.alerts.push({
            blood_pressure: req.body.bp,
            body_temperature: req.body.temp,
            subject: req.body.subject,
            time: getDateTime(),
            description: req.body.desc
        });
        patient.save().then(saved => {
            req.flash('success', 'Alert Send');
            res.redirect("/patient/index");
        }).catch(err => {
            console.log(err);
        });
    });
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

