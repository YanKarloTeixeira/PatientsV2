const api = require("../controllers/api.server.controllers");
const passport = require("passport");

var express = require('express');
var router = express.Router();
var cors = require('cors')

module.exports = function (app) {

    // app.use('/api', apiRouter);
    app.use(cors());


    router.get('/getpatients', api.getPatients);
    // function (req, res, next) {
    // Patient.find({}).then((patients) => {
    //     res.send({ patients: patients });
    // });
    // })


    router.get('/patient/:id', api.getPatient);
    // function (req, res, next) {
    //     Patient.find({ _id: req.params.id }).then(patient => {
    //         res.send({ patient: patient });
    //     })
    // })

};