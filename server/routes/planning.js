const express = require('express') ;
const planningController = require('../contollers/planningController');
const router = express.Router();
const {check} = require('express-validator');


router.post('/newplanning',[
    check('jour').not().isEmpty(),check('heureDebut').not().isEmpty(),
    check('heureFin').not().isEmpty(),check('jury').not().isEmpty(),
    check('sujet').not().isEmpty(),
    check('salle').not().isEmpty(),
],planningController.newplanning) ;

router.get('/',planningController.getPlannings),

module.exports = router;