var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var cors = require('cors')
var indexRouter = require('./routes/index');
var nursesRouter = require('./routes/nurses');
var patientRouter = require('./routes/patients');
var apiRouter = require('./routes/api');
var alertRouter = require('./routes/alert');
const exphbs = require('express-handlebars');

var app = express();

var url = 'mongodb://romk444:jinlian123@comp-308-romk-shard-00-00-ix2wh.gcp.mongodb.net:27017,comp-308-romk-shard-00-01-ix2wh.gcp.mongodb.net:27017,comp-308-romk-shard-00-02-ix2wh.gcp.mongodb.net:27017/test?ssl=true&replicaSet=comp-308-romk-shard-0&authSource=admin&retryWrites=true'
//MongoDb database connection
mongoose.connect(url,{useNewUrlParser:true}).then(db=>{
    console.log('connected');
}).catch(err=>{
    console.log(err);
});




//passport set
// up
app.use(session({
    secret: 'asadali421',
    saveUninitialized: true,
    resave: true

}));
app.use(passport.initialize());
app.use(passport.session());

//flash messages
app.use(flash());
app.use((req,res,next)=>{
    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');
    res.locals.success = req.flash('success');
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();

});
const {equal}  = require('./helpers/handlebars-helper');
// view engine setup
app.engine('hbs',exphbs({defaultLayout: 'home',
    partialsDir: path.join(__dirname, 'views/Partials'),
    layoutsDir: path.join(__dirname, 'views/Layouts'),
    helpers: {equal:equal}
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nurse',express.static(path.join(__dirname, 'public')));
app.use('/patient',express.static(path.join(__dirname, 'public')));
app.use('/patient/signs',express.static(path.join(__dirname, 'public')));
app.use('/patient/sign-list',express.static(path.join(__dirname, 'public')));
app.use('/patient/symptoms',express.static(path.join(__dirname, 'public')));
app.use('/alert',express.static(path.join(__dirname, 'public')));
app.use('/alert/new',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/nurse', nursesRouter);
app.use('/patient', patientRouter);
app.use('/api', apiRouter);
app.use('/alert', alertRouter);
app.use(cors());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

});


app.listen(3000, () => {
    console.log("listening on 3000")
});