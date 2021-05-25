const HttpError = require('../models/Http-error')
const mongoose = require('mongoose')
const Filiere = require('../models/filiere')
const Etudiant = require('../models/etudiant')








const filieres= async(req,res,next) =>{

    let filieres;
    try {
     filieres = await Filiere.find({}).populate('etudiants', "");  
    } catch (err) {
      const error = new HttpError(
        'Fetching filieres failed, please try again later.',
        500
      );
      return next(error);
    }  

    res.status(201).json({filieres:filieres});
}



const studentsByfiliere= async(req,res,next) =>{
    const filiereId = req.params.filiereId;
    let students;
    try {
     students = await Filiere.findById(filiereId).populate('etudiants', "");
    } catch (err) {
      const error = new HttpError(
        'Fetching students failed, please try again later.',
        500
      );
      return next(error);
    }  

    res.status(201).json({students:students.etudiants});
}


exports.filieres = filieres;
exports.studentsByfiliere = studentsByfiliere;