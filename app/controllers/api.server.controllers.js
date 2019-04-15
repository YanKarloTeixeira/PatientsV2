const mongoose = require("mongoose");
const Patient = mongoose.model("Patient");
const Nurse = mongoose.model("Nurse");


exports.getPatients = function (req, res, next) {
    Patient.find({})
        .then((patients) => {
            res.send({ patients: patients });

        })
};

exports.getPatient = function (req, res, next) {
    Patient.find({ _id: req.params.id })
        .then(patient => {
            res.send({ patient: patient });
        });

};
