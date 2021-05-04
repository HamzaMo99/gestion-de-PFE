const HttpError = require("../models/Http-error");
const Planning = require("../models/planning");
const Stage= require("../models/stage.js");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Enseignant =  require("../models/enseignant");


const newplanning = async (req,res,next)=>{

    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return next(new HttpError("certains champs saisient invalide", 422));
    }
    const data =req.body ;
    let description ;
    try{
      description =await Stage.findById(data.sujet.value);
    }catch(err1){
      const err = new HttpError(
        'getting stage Id failed',
        500
      );
  
      return next(err);
    }

    let enseignant; //les encadrant interne
    try {
      console.log(data.jury );
      enseignant = await Enseignant.find({ _id:data.jury  });
    } catch (er) {
      const error = new HttpError(
        "finding enseignants failed, please try again.",
        500
      );
      return next(error);
    }

    try {

      console.log(enseignant);
      console.log(req.body)
          const newPlanning = new Planning({
              jour:data.jour,
              heureDebut : data.heureDebut,
              heureFin : data.heureFin,
              jury : enseignant,
              stageId: description,
              salle :data.salle.label
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

exports.newplanning = newplanning;