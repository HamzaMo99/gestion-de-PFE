const express = require('express');
const enseignantConroller = require('../contollers/enseignantController')
const router =express.Router();



router.get('',enseignantConroller.enseignants)

module.exports = router;