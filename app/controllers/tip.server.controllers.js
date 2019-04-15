const mongoose = require("mongoose");
const Tip = mongoose.model("Tip");
// const passport = require("passport");


exports.NewTip = function (req, res, next) {
    var errors = [];
    if (!req.body.title) {

        errors.push({
            messages: 'Title is required'
        });
    }
    if (!req.body.description) {
        errors.push({ messages: 'Description is required' })
    }
    if (errors.length > 0) {

        res.render('home/new_tip', {
            errors: errors,
            video: req.body.video,
            description: req.body.description
        });
    }
    else {
        var newTip = Tip({
            description: req.body.description,
            title: req.body.title,
            createdAt: getDateTime()

        });
        newTip.save().then(
            saved => {
                req.flash('success_message', 'Tip add successfuly');
                res.redirect('/tips');
            }
        ).catch();
    }
};

exports.delete = function (req, res, next) {
    Tip.deleteOne({ _id: req.params.id }).then(removed => {
        req.flash('success_message', 'Tip deleted successfuly');
        res.redirect('/tips')
    });
};


function getDateTime() {

    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day;

}