// var express = require('express');
// var router = express.Router();
// var {userAuthenticated} = require('../helpers/authentication');
// var {userAuthenticated2} = require('../helpers/authentication2');
// const Video = require('../models/video');
// const Tip = require('../models/tip');

// router.all('/*',(req,res,next)=>{

//     req.app.locals.layout='home';
//     next();
// });

/* GET Layouts page. */
// router.get('/', function(req, res, next) {
//   res.render('home/index', { title: 'Express' });
// });


// router.get('/new-video',userAuthenticated,function (req,res,next) {
//     res.render('home/new_video');
// })

// router.get('/video-list',function (req,res,next) {
//     Video.find({}).then(videos=>{
//         res.send({videos: videos});
//     })
// })

// router.delete('/video',function (req,res,next) {
//     Video.remove({_id:req.body.video}).then(removed=>{
//         req.flash('success','Video Deleted Successfully');
//         res.send({ok:"ok"})
//     }).catch(err=>{
//         console.log(err)
//     })
// })

// router.post('/new-video',userAuthenticated,function (req,res,next) {
//     var errors = [];
//     if (!req.body.title) {

//         errors.push({
//             messages: 'Title is required'
//         });
//     }
//     if (!req.body.video) {
//         errors.push({messages: 'Video URL is required'})
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
//         ).catch()
//     }
// })

// router.get('/tips',userAuthenticated2,function (req,res,next) {
//     Tip.find({}).then(tips=>{
//         res.render('home/tips',{tips:tips});
//     })
// })


// router.get('/new-tip',userAuthenticated,function (req,res,next) {
//     res.render('home/new_tip')
// })

// router.post('/new-tip',userAuthenticated,function (req,res,next) {
//     var errors = [];
//     if (!req.body.title) {

//         errors.push({
//             messages: 'Title is required'
//         });
//     }
//     if (!req.body.description) {
//         errors.push({messages: 'Description is required'})
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
//         ).catch()
//     }
// })

// router.get('/delete-tip/:id',function (req,res,next) {
//     Tip.deleteOne({_id:req.params.id}).then(removed=>{
//         req.flash('success_message', 'Tip deleted successfuly');
//         res.redirect('/tips')
//     })
// })

// function getDateTime() {

//     var date = new Date();

//     var year = date.getFullYear();

//     var month = date.getMonth() + 1;
//     month = (month < 10 ? "0" : "") + month;

//     var day  = date.getDate();
//     day = (day < 10 ? "0" : "") + day;

//     return year + ":" + month + ":" + day ;

// }
// module.exports = router;
