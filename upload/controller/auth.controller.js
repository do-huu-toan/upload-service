const User = require('../model/User')
const jwt = require('jsonwebtoken');

function createToken(ObjectID) {
    var token = jwt.sign({ id: ObjectID }, process.env.SECRET_TOKEN);
    return token;
}
const auth = (req, res) => {
    User.findOne({
        usename: req.body.usename,
        password: req.body.password
    }).then(data => {
        var token = createToken(data._id);
        //console.log(token);
        res.cookie('token', token);
        return res.redirect('/');
    }).catch(err => {
        //console.log(err);
        return res.redirect("/login");
    })
}

module.exports = {
    auth
}