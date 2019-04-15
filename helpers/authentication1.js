module.exports={
    userAuthenticated1: function (req,res,next) {
        if(req.isAuthenticated() )
        {
            if(req.user.user_type=="patient") {
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