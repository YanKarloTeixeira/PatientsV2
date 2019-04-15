module.exports={
    userAuthenticated3: function (req,res,next) {
        if(req.isAuthenticated())
        {
            if(req.user.user_type=="nurse") {
                return next();
            }
            else if(req.params.id == req.user.id)
            {
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