const express = require('express')
const company = require('../controllers/users.controller')

const router = express.Router();

router.route('/login').post(company.loginUser)
router.route('/user-register').post(company.createSuperAdmin)

module.exports = { router }