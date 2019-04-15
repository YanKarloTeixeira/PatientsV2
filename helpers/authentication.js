module.exports={
    userAuthenticated: function (req,res,next) {
        if(req.isAuthenticated())
        {
            if(req.user.user_type=="nurse") {
                return next();
            }
            else
            {
                res.redirect('/patient/index');
            }
        }
        res.redirect('login');
    }
}