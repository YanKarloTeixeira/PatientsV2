// var express = require('express');
// var router = express.Router();
// var {userAuthenticated4} = require('../helpers/authentication4');
// var {userAuthenticated} = require('../helpers/authentication');
// const Patient = require('../models/patient');
// const Nurse = require('../models/nurse');


// router.get('/',userAuthenticated,function (req,res,next) {
//         res.render('alert/index');
// })

// router.get('/new/:id',userAuthenticated4,function (req,res,next) {
//     res.render('alert/new-alert');
// })

// router.post('/send/:id',userAuthenticated4,function (req,res,next) {
//     Patient.findOne({_id:req.params.id}).then(patient=>{
//         patient.alerts.push({
//             blood_pressure : req.body.bp,
//             body_temperature : req.body.temp,
//             subject : req.body.subject,
//             time :  getDateTime(),
//             description : req.body.desc
//         })
//         patient.save().then(saved=>{
//             req.flash('success','Alert Send');
//             res.redirect("/patient/index");
//         }).catch(err=> {
//             console.log(err)
//         })
//     })


// })

// function getDateTime() {

//     var date = new Date();

//     var hour = date.getHours();
//     hour = (hour < 10 ? "0" : "") + hour;

//     var min  = date.getMinutes();
//     min = (min < 10 ? "0" : "") + min;

//     var sec  = date.getSeconds();
//     sec = (sec < 10 ? "0" : "") + sec;

//     var year = date.getFullYear();

//     var month = date.getMonth() + 1;
//     month = (month < 10 ? "0" : "") + month;

//     var day  = date.getDate();
//     day = (day < 10 ? "0" : "") + day;

//     return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

// }


// module.exports = router;
