module.exports={
    userAuthenticated4: function (req,res,next) {
        if(req.isAuthenticated() )
        {
            if(req.user.user_type=="patient" && req.params.id == req.user.id) {
                return next();
                }
                else
            {
                res.redirect('/nurse/index');
            }
        }
        res.redirect('login');
    }
}