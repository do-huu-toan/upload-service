const roleController = require('../controller/role');

const express = require('express');
const Role = require('../model/Role');
var router = express.Router();

router.route('/')
    .get(roleController.findAllRole)
router.route('/create')
    .post(roleController.create)

module.exports = router;