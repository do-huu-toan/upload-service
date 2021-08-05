const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    role: {
        type: String,
        unique: true,
        require: true
    },
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role