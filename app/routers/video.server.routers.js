const video = require("../controllers/video.server.controllers");
const passport = require("passport");
var { userAuthenticated } = require('../helpers/authentication');
var { userAuthenticated2 } = require('../helpers/authentication2');
var cors = require('cors')
const exphbs = require('express-handlebars');

module.exports = function (app) {
    app.use(cors());
    router.get('/video', userAuthenticated2, function (req, res, next) {
        res.render('home/video');
    });

    router.get('/video-list', function (req, res, next) {
        Video.find({}).then(videos => {
            res.send({ videos: videos });
        });
    });

    router.delete('/video', video.delete);
    // function (req, res, next) {
    //     Video.remove({ _id: req.body.video }).then(removed => {
    //         req.flash('success', 'Video Deleted Successfully');
    //         res.send({ ok: "ok" })
    //     }).catch(err => {
    //         console.log(err)
    //     });
    // });

    router.post('/new-video', userAuthenticated, video.NewVideo);
    // function (req, res, next) {
    //     var errors = [];
    //     if (!req.body.title) {

    //         errors.push({
    //             messages: 'Title is required'
    //         });
    //     }
    //     if (!req.body.video) {
    //         errors.push({ messages: 'Video URL is required' })
    //     }
    //     if (errors.length > 0) {

    //         res.render('home/new_video', {
    //             errors: errors,
    //             video: req.body.video,
    //             title: req.body.title
    //         });
    //     }
    //     else {
    //         var newVideo = Video({
    //             video: req.body.video,
    //             title: req.body.title

    //         });
    //         newVideo.save().then(
    //             saved => {
    //                 req.flash('success_message', 'Video add successfuly');
    //                 res.redirect('/video');
    //             }
    //         ).catch();
    //     }
    // });
};