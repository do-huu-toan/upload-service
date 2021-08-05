const User = require("../model/User");
const authencation = require('../middleware/auth.middleware')
const checkRole = async function(req, res, next){
    const userByToken = await User.findById(authencation.checkToken(req.cookies.token).id).populate('role');
    if(userByToken.role.role == 'admin' )
    {
       
        next();
    }
    else
    {
        return res.status(404).json('Bạn không có quyền vào trang  này!')
    }
}

module.exports = {
    checkRole
};
