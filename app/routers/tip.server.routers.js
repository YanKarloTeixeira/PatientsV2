const tip = require("../controllers/tip.server.controllers");
// const passport = require("passport");
var { userAuthenticated } = require('../helpers/authentication');
var { userAuthenticated2 } = require('../helpers/authentication2');
var cors = require('cors')
const exphbs = require('express-handlebars');

module.exports = function (app) {

    app.use(cors());
    router.get('/tips', userAuthenticated2, function (req, res, next) {
        Tip.find({}).then(tips => {
            res.render('home/tips', { tips: tips });
        });
    });


    router.get('/new-tip', userAuthenticated, function (req, res, next) {
        res.render('home/new_tip');
    });

    router.post('/new-tip', userAuthenticated, tip.NewTip);
    // function (req, res, next) {
    //     var errors = [];
    //     if (!req.body.title) {

    //         errors.push({
    //             messages: 'Title is required'
    //         });
    //     }
    //     if (!req.body.description) {
    //         errors.push({ messages: 'Description is required' })
    //     }
    //     if (errors.length > 0) {

    //         res.render('home/new_tip', {
    //             errors: errors,
    //             video: req.body.video,
    //             description: req.body.description
    //         });
    //     }
    //     else {
    //         var newTip = Tip({
    //             description: req.body.description,
    //             title: req.body.title,
    //             createdAt: getDateTime()

    //         });
    //         newTip.save().then(
    //             saved => {
    //                 req.flash('success_message', 'Tip add successfuly');
    //                 res.redirect('/tips');
    //             }
    //         ).catch();
    //     }
    // });

    router.get('/delete-tip/:id', tip.delete);
    // function (req, res, next) {
    //     Tip.deleteOne({ _id: req.params.id }).then(removed => {
    //         req.flash('success_message', 'Tip deleted successfuly');
    //         res.redirect('/tips')
    //     });
    // });
};