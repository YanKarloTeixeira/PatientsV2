// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://romk444:jinlian123@comp-308-romk-shard-00-00-ix2wh.gcp.mongodb.net:27017,comp-308-romk-shard-00-01-ix2wh.gcp.mongodb.net:27017,comp-308-romk-shard-00-02-ix2wh.gcp.mongodb.net:27017/test?ssl=true&replicaSet=comp-308-romk-shard-0&authSource=admin&retryWrites=true',

	sessionSecret: 'developmentSessionSecret',

	facebook: {
		clientID: 'Facebook Application ID',
		clientSecret: 'Facebook Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};