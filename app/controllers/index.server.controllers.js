// const mongoose = require("mongoose");
// const Course = mongoose.model("Courses");
// const Registration = mongoose.model("Registrations");
// const Student = mongoose.model("Students");
// const passport = require("passport");



// exports.list = function (req, res) {
//     Course.find({}, function (err, courses) {
//         if (err) {
//             // Call the next middleware with an error message
//             return next(err);
//         } else {
//             console.log(courses);
//             // Use the 'response' object to send a JSON response
//             res.status(200).json(courses);
//             // res.render("CoursesList", {
//             //   title: "List All Courses",
//             //   courses: courses
//             // });
//         }
//     });
// };
// //