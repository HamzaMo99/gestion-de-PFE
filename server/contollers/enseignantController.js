const HttpError = require('../models/Http-error')
const mongoose = require('mongoose')
const Enseignant =require('../models/enseignant')








const enseignants= async(req,res,next) =>{
  


    let enseignants;
    try {
     enseignants = await Enseignant.find({});  //get all the users without password
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    
   

    

    res.status(201).json({enseignants:enseignants});
}


exports.enseignants = enseignants;