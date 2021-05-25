const HttpError = require("../models/Http-error");
const Planning = require("../models/planning");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Enseignant =  require("../models/enseignant");


const newjury = async (req,res,next) => {
    const errors = validationResult(req);
    let enseignants=[] ; //les encadrant interne
    let enseignant ;
    try {
    for(var i = 0; i<req.body.listeJury.length;i++){
      enseignant = await Enseignant.find({ _id: req.body.listeJury[i].enseignant.value  });
     enseignants.push(enseignant[0]) ;
    }
  
    } catch (er) {
      const error = new HttpError(
        "finding enseignants failed, please try again.",
        500
      );
      return next(error);
    }
    try {
 
     
          const newPlanning = new Planning({
              jury : enseignants,
              stageId: req.body.sujet.value,
              jour:new Date(),
              heureDebut : new Date(),
              heureFin : new Date(),
              salle :"Salle 0"
          }) ;
          const sess = await mongoose.startSession(); // open a session
          sess.startTransaction();
          await newPlanning.save({ session: sess });
          
          sess.commitTransaction();
    }catch(err2){
       const err = new HttpError(
      'getting stage Id failed',
      500
    );

    return next(err);
    }
   
  
  message="Le planning est Enregistre ! "
  console.log(message) ;

}

exports.newjury= newjury;