const jwt = require('jsonwebtoken');
const User = require('../model/User');

function checkToken(token) {
    var result = undefined;
    jwt.verify(token, process.env.SECRET_TOKEN, function (err, data) {
        if (err) {
            //console.log('Error encode: ',err);
            return null;
        }
        else {
            result = data;
        }

    })
    return result;
}

var authenicate = async (req, res, next) => {
    if (req.cookies.token) {
        var encode = checkToken(req.cookies.token);
        if (encode) {
            const userByToken = await User.findById(encode.id).populate('role');
            if(User)
            {
                next();
            }
            else
            {
                return res.status(404).json("Not found");
            }
            return;
        }
        else {
            res.clearCookie("token");
            return res.redirect('/login');
        } 
    }
    else
    {
        return res.redirect('/login');
    }

}

var authenicateLogin = (req, res, next) => {
    if (req.cookies.token) {
        var encode = checkToken(req.cookies.token);
        if (encode) {
            res.redirect('/');
        }
        else {
            res.clearCookie("token");
            return res.redirect('/login');
        } 
    }
    else
    {
        next();
    }

}

module.exports = {
    authenicate,
    authenicateLogin,
    checkToken
}