const HttpError = require('../models/Http-error')
const mongoose = require('mongoose')
const Etudiant =require('../models/etudiant')





const getstudents = async (req,res,next) =>{

    let students
    try {
        students = await Etudiant.find({},['nom','prenom','_id'])
    } catch (error) {
      const err = new HttpError(
        'getting students failed',
        500
      );

      return next(err);
    }

   

    res.json({students:students})
}



exports.getstudents = getstudents;
