module.exports={
    userAuthenticated2: function (req,res,next) {
        if(req.isAuthenticated())
        {
            return next();
        }
        res.redirect('/patient/login');
    }
}