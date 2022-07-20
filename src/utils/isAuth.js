const User = require("./../public/user.json");

module.exports = (req,res,next) => {

    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    const found = User.filter ((el)=> {
        return el.email === user && el.password === pass
     });
 
    if (found) {
       req.body = Object.assign(req.body,{userId : user})
        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }


}