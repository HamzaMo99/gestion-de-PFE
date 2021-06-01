const express = require('express');
const filiereConroller = require('../contollers/filiereController')
const router =express.Router();



router.get('',filiereConroller.filieres)
router.post('/option',filiereConroller.addOptions)

router.get('/:filiereId',filiereConroller.studentsByfiliere)

module.exports = router;