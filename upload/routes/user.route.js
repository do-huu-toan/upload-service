const userController = require('../controller/user');

const express = require('express');
const User = require('../model/User');
const Role = require('../model/Role');
var router = express.Router();
const checkRoleMiddleware = require('../middleware/chekrole.middleware');

router.route('/')
    .get(userController.findAllUser)
    .post()

router.route('/create')
    .post(checkRoleMiddleware.checkRole, userController.create, (req, res) => {
        return res.redirect('/user/manager');
    })
router.route('/api/delete')
    .get(checkRoleMiddleware.checkRole,userController.deleteUser, (req, res) => {
        return res.redirect('/user/manager');
    })
router.route('/manager')
    .get(checkRoleMiddleware.checkRole, async (req, res, next) => {
        //findAllUser:
        let usersdto = null;
        try {
            const users = await User.find({}).populate('role');

            /*
            const TestUsers = await User.find({usename: 'dohuutoannb1'}).populate('role')
            console.log('Role user: ', TestUsers[0].role)
            */

            usersdto = users.map((data) => {
                return {
                    id: data._id,
                    usename: data.usename,
                    role: data.role.role
                }
            })
            //console.log('Data Transfer Object: ', usersdto);
        }
        catch (error) {
            next(error)
        }

        //FindAllRole:
        let rolesdto = null;
        try {
            const roles = await Role.find({}).populate('owner');

            /*
            const TestUsers = await User.find({usename: 'dohuutoannb1'}).populate('role')
            console.log('Role user: ', TestUsers[0].role)
            */

            rolesdto = roles.map((data) => {
                return {
                    id: data._id,
                    role: data.role,
                }
            })

            //console.log('Role DTO: ', rolesdto);
            //console.log('Data Transfer Object: ', usersdto);
        }
        catch (error) {
            next(error)
        }

        res.render('manager-user', {
            users: usersdto,
            roles: rolesdto
        })
    });

module.exports = router;