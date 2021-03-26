const express = require('express');
const studentController = require('../contollers/studentController')
const router =express.Router();
const { check } = require('express-validator');


router.get('/',
 studentController.getstudents)

module.exports = router;
