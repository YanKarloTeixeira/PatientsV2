// Load the module dependencies
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
//const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
var cors = require('cors')

var __dirname = ''
// var indexRouter = require('../app/routes/index.server.router');
// var indexRouter = require('../app/routers/index.server.routers');
// var nursesRouter = require('../app/routers/nurse.server.routers');
// var patientRouter = require('../app/routers/patient.server.routers');
// var apiRouter = require('../app/routers/api.server.routers');
// var alertRouter = require('../app/routers/alert.server.routers');


const exphbs = require('express-handlebars');


// Define the Express configuration method
module.exports = function () {
	// Create a new Express application instance
	const app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	//if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
	// } else if (process.env.NODE_ENV === 'production') {
	// 	app.use(compress());
	// }

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		secret: 'asadali421',
		saveUninitialized: true,
		resave: true

	}));

	// Set the application view engine and 'views' folder
	// app.set('views', '../views');
	// app.set('view engine', 'hbs');

	// Configure the flash messages middleware
	app.use(flash());
	app.use((req, res, next) => {
		res.locals.user = req.user || null;

		res.locals.success_message = req.flash('success_message');
		res.locals.success = req.flash('success');
		res.locals.error_message = req.flash('error_message');
		res.locals.error = req.flash('error');
		next();

	});
	// Load the routing files
	require('../app/routers/index.server.routers.js')(app);
	require('../app/routers/api.server.routers.js')(app);
	require('../app/routers/alert.server.routers.js')(app);
	require('../app/routers/nurse.server.routers.js')(app);
	require('../app/routers/patient.server.routers.js')(app);

	// Configure the Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());


	// Configure static file serving

	app.use(express.static('../public'));

	// const { equal } = require('./helpers/handlebars-helper');
	const { equal } = require('../helpers/handlebars-helper');
	// view engine setup
	app.engine('hbs', exphbs({
		defaultLayout: 'home',
		partialsDir: path.join(__dirname, 'app/views/Partials'),
		layoutsDir: path.join(__dirname, 'app/views/Layouts'),
		helpers: { equal: equal }
	}));
	app.set('view engine', 'hbs');
	app.set('views', path.join(__dirname, 'views'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/nurse', express.static(path.join(__dirname, 'public')));
	app.use('/patient', express.static(path.join(__dirname, 'public')));
	app.use('/patient/signs', express.static(path.join(__dirname, 'public')));
	app.use('/patient/sign-list', express.static(path.join(__dirname, 'public')));
	app.use('/patient/symptoms', express.static(path.join(__dirname, 'public')));
	app.use('/alert', express.static(path.join(__dirname, 'public')));
	app.use('/alert/new', express.static(path.join(__dirname, 'public')));

	// app.use('/', indexRouter);
	// app.use('/nurse', nursesRouter);
	// app.use('/patient', patientRouter);
	// app.use('/api', apiRouter);
	// app.use('/alert', alertRouter);
	app.use(cors());


	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		next(createError(404));
	});

	// error handler
	app.use(function (err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

	});

	// Return the Express application instance
	return app;
};