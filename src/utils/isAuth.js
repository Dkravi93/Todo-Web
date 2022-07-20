module.exports = (req,res,next) => {
    const userId = req.session.userId;
    const password = req.session.password;
    if(userId && password){
        next();
    }else{
        res.json({
            status: 'failed',
            message: 'Please Login to access this resource',
        })
    }
}