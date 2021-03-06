// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
	// Use Mongoose to connect to MongoDB

	// const db = mongoose.connect(config.db);

	const db = mongoose.connect(config.db, { useNewUrlParser: true }).then(db => {
		console.log('connected');
	}).catch(err => {
		console.log(err);
	});
	// // Load the 'Student' model 
	require('../app/models/nurse.server.model');
	require('../app/models/patient.server.model');
	require('../app/models/tip.server.model');
	require('../app/models/video.server.model');

	// Return the Mongoose connection instance
	return db;
};