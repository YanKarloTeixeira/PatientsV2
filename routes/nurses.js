// var express = require('express');
// var router = express.Router();
// var passport = require('../helpers/strategy')
// var {userAuthenticated} = require('../helpers/authentication');
// var LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');
// var Patient = require('../models/patient')
// const Nurse = require('../models/nurse');
// router.all('/*',(req,res,next)=>{

//     req.app.locals.layout='home';
//     next();
// });




// router.get('/index' ,userAuthenticated,function (req,res,next) {
//     res.render('nurse/index',{title:"Express"});
// })

// router.get('/',userAuthenticated,function (req,res,next) {
//     res.render('nurse/index',{title:"Express"});
// })

// /* GET Signup page. */
// router.get('/new' , function(req, res, next) {
//     if(!req.isAuthenticated())
//     {
//         res.render('nurse/new');
//     }
//     else
//     {
//         res.redirect('/nurse/index');
//     }
// });

// // Register Proccess
// router.post('/new', function(req, res, next) {
//     if(!req.isAuthenticated())
//     {
//     var errors = [];
//     if (!req.body.name) {

//         errors.push({
//             messages: 'Name is required'
//         });
//     }
//     if (!req.body.email) {
//         errors.push({messages: 'Email is required'})
//     }

//     if (!req.body.username) {
//         errors.push({messages: 'User Name is required'})
//     }
//     if (!req.body.password) {
//         errors.push({messages: 'Password is required'})
//     }
//     if (req.body.password != req.body.password2) {
//         errors.push({messages: 'Password Mismatch'})
//     }
//     if (errors.length > 0) {

//         res.render('nurse/new', {
//             errors: errors,
//             name: req.body.name,
//             email: req.body.email,
//             username: req.body.username
//         });
//     }
//     else {

//         Nurse.findOne({email: req.body.email}).then(nurse=>{

//             if(!nurse)
//             {
//                 Nurse.findOne({username:req.body.username}).then(users=>{

//                     if(!users)
//                     {
//                         var newNurse = Nurse({
//                             name: req.body.name,
//                             username: req.body.username,
//                             email: req.body.email,
//                             password: req.body.password

//                         });
//                         bcrypt.genSalt(10, (err, salt) => {

//                             bcrypt.hash(newNurse.password, salt, (err, hash) => {
//                                 newNurse.password = hash;
//                                 newNurse.save().then(
//                                     saved => {
//                                         req.flash('success_message', 'User registered successfuly');
//                                         res.redirect('/nurse/login');
//                                     }
//                                 ).catch()
//                             });

//                         })
//                     }
//                     else{

//                         req.flash('error_message','UserName Already Exists');
//                         res.render('nurse/new',{
//                             name: req.body.name,
//                             email: req.body.email,
//                             username: req.body.username,
//                             error_message:req.flash('error_message')
//                         });
//                     }
//                 })


//             }
//             else{

//                 req.flash('error_message','Email Already Exists');
//                 res.render('nurse/new',{
//                     name: req.body.name,
//                     email: req.body.email,
//                     username: req.body.username,
//                     error_message: req.flash('error_message')
//                 });
//             }
//         }).catch(err=>{
//             console.log(err);
//         })
//     }
//     }
//     else
//     {
//         res.redirect('/nurse/index');
//     }
// });

// //get login page
// router.get('/login',function(req,res,next){
// if(!req.isAuthenticated()) {
//     res.render('nurse/login');
// }
// else
// {
//     res.redirect('/nurse/index');
// }

// })

// //login process
// router.post('/login',function(req,res,next){
// if(!req.isAuthenticated()){
//     passport.authenticate('nurse-local', {
//         successRedirect:'index',
//         failureRedirect:'login',
//         failureFlash: true
//     })(req, res, next);

// }
// else
// {
//     res.redirect('/nurse/index');
// }
// });

// router.get('/logout', function (req,res,next) {
//     req.logout();
//     req.flash('success', 'You are logged out');
//     res.redirect('login');
// })


// module.exports = router;
