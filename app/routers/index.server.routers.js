const index = require("../controllers/index.server.controllers");
const passport = require("passport");
var express = require('express');
var router = express.Router();
var cors = require('cors')

module.exports = function (app) {
    app.use(cors());
    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'home';
        next();
    });
    router.all('/*', (req, res, next) => {
        req.app.locals.layout = 'home';
        next();
    });
    
    router.get('/', function (req, res, next) {
        res.render('home/index', { title: 'Express' });
    });

    
}