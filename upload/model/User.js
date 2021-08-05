const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    usename: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User