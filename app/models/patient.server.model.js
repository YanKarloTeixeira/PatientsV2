const mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

// Patient Schema
const PatientSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    user_type: {
        type: String,
        default: "patient"
    },
    visits: [{
        blood_pressure: String,
        heart_rate: String,
        body_temperature: String,
        respiratory_rate: String,
        time: String,
        nurse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nurse'
        }
    }],

    alerts: [{
        blood_pressure: String,
        body_temperature: String,
        subject: String,
        time: String,
        description: String,
    }],

    admin: false,

    resetPasswordToken: String,

    resetPasswordExpires: Date

});


mongoose.model('Patient', PatientSchema);


//const Nurse = module.exports = mongoose.model('Patient', PatientSchema);
