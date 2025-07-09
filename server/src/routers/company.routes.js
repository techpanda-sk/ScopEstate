const express = require('express')
const company = require('../controllers/company.controller')

const router = express.Router();

router.route('/register').post(company.register)

module.exports = {router}