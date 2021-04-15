const HttpError = require('../models/Http-error')
const mongoose = require('mongoose')
const Etudiant =require('../models/stage')





const getstages = async (req,res,next) =>{

    let stages
    try {
        stages = await Stage.find({},[])
    } catch (error) {
      const err = new HttpError(
        'getting stages failed',
        500
      );

      return next(err);
    }

   

    res.json({stages:stages})
}



exports.getstages = getstages;
