const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var bcrypt = require("bcryptjs");

// Nurse Schema
const NurseSchema = new Schema({

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

    user_type: {
        type: String,
        default: "nurse"
    },


    admin: false,

    resetPasswordToken: String,

    resetPasswordExpires: Date



});

// const Nurse = module.exports = mongoose.model('Nurse', NurseSchema);
mongoose.model('Nurse', NurseSchema);
