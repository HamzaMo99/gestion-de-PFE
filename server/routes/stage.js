const express = require('express');
const stageController = require('../contollers/stageController')
const router =express.Router();
const { check } = require('express-validator');


//userId
router.post('/newstage',
  [check('tel').not().isEmpty(),check('email').normalizeEmail().isEmail(),check('organisme').not().isEmpty()
  ,check('rep').not().isEmpty(),check('encExterne').not().isEmpty(),check('description').not().isEmpty(),
 check('ville').not().isEmpty(),check('pays').not().isEmpty(),check('selectedProfs').isArray({ min: 0, max: 10 }),
 check('startDate').not().isEmpty(),check('finDate').not().isEmpty()
],

 stageController.newStage)

 router.get('/',stageController.getStages)
 router.post('/valider',stageController.validerStage)
 router.delete('/delete',stageController.deleteStage)
 
 router.get('/stageInfo/:pid',stageController.getStageInfo)

module.exports = router;
