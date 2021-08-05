const Role = require('../model/Role')

const create = async (req, res, next) => {
    try {
        const newRole = new Role({
            role: req.body.role
        })
            newRole.save();
            return res.status(201).json(newRole);
    }
    catch(error)
    {
        return res.json(error);
    }
}

const findAllRole = async (req, res, next) => {
    try {
        const role = await Role.find({});
        return res.status(200).json({ role })
    }
    catch (error) {
        next(error)
    }

}

module.exports = {
    create,
    findAllRole
}