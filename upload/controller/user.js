const User = require('../model/User')
const Role = require('../model/Role')
const create = async (req, res, next) => {
    var newUser = new User({
        usename: req.body.usename,
        password: req.body.password
    })
    Role.findOne({
        role: req.body.role
    }).then(data => {
        newUser.role = data._id;
        newUser.save();
        next();
        //return res.status(201).json('Success!')
    }).catch(err => {
        return res.status(500).json(err)
    })
}


const findOneUser = (usename, password) => {
    return User.findOne({
        usename: usename,
        password: password
    })
}

const findAllUser = async (req, res, next) => {
    try{
        const users = await User.find({});
        return res.status(200).json({users})
    }
    catch(error)
    {
        next(error)
    }
    
}

const updateUser = async (req, res, next) => {

}

const deleteUser = async (req, res, next) => {
    console.log("run here delete");
    const result = await User.findByIdAndRemove(req.query.id);
    if(result)
    {
       next()
    }
    else
    {
        return res.status(500).json({
            message: "Error"
        })
    }
    
}


module.exports = {
    create,
    findOneUser,
    findAllUser,
    updateUser,
    deleteUser
}