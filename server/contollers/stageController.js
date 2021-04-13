const HttpError = require('../models/Http-error')
const Stage = require('../models/stage')
const mongoose = require('mongoose')
const Etudiant =require('../models/etudiant')
const Enseignant =require('../models/enseignant')
const { validationResult } = require('express-validator');



const newStage= async(req,res,next) =>{
  console.log(req.body)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('certains champs saisient invalide', 422)
    )
  }
    const {binome, email,tel,organisme,rep,encExterne,description,ville,pays,selectedProfs,startDate, finDate,userId } = req.body;
   
    let existingStudent = []
    try {
      if(binome===''){
        existingStudent = await Stage.find({etudiants:userId})

      }else{
      existingStudent = await Stage.find({"$or": [{   'etudiants': userId}, {'etudiants': binome }]})
      }
    } catch (err) {
      console.log(err)
      const error = new HttpError(
        'submitting stage failed, please try again',
        500
      );
      return next(error);
    }
    
    if (existingStudent.length > 0) {
      const error = new HttpError(
        'Vous aver deja un soumission de stage .',
        422
      );
      return next(error);
    }
      
    let etudiants ;

    try {
         etudiants = await Etudiant.find({ _id:[userId,binome]})
       
        
    } catch (er) {
        const error = new HttpError(
            'finding students failed, please try again',
            500
          );
          return next(error); 
        
    }

    console.log(etudiants)
     
    let enseignant //les encadrant interne
    try {
        enseignant = await Enseignant.find({_id:selectedProfs})
       
   } catch (er) {
       const error = new HttpError(
           'finding enseignants failed, please try again.',
           500
         );
         return next(error); 
       
   }


    const newStage = new Stage({
        organismeAceuil : organisme,
        posteRepresentant: rep,
        encadrantExterne :encExterne,
        description :description,
        villeStage:ville,
        paysStage :pays,
        dateDebut:startDate,
        dateFin : finDate,
        etudiant:userId,
        enseignants:enseignant     
    });

   
    const sess = await mongoose.startSession();    // open a session 
    sess.startTransaction();
    newStage.etudiants=etudiants;  
    // newStage.enseignants.push(enseignant)    

    await newStage.save({session:sess});

    //  enseignant[1].stages.push(newStage)
    // await enseignant[1].save();
      enseignant.map( async (e) =>{
         console.log(e)
        e.stages.push(newStage)
        await e.save();
     } ) 
     
     etudiants.map(async (e) =>{
      console.log(e)
     e.stageId=newStage
     e.tel=tel;
     e.email=email;
     await e.save();
      } ) 

    // etudiant.stageId=newStage;
    // etudiant.tel=tel;
    // etudiant.email=email;
    // await etudiant.save();

    sess.commitTransaction();
   try { 
    
   
       
   } catch (er) {
    const error = new HttpError(
        'submitting stage failed, please try again.',
        500
      );
      return next(error);    
   }
    

    res.status(201).json({message:"stage submitted"});
}

const getstages = async (req,res,next) =>{

  let stages
  try {
    stages = await Stage.find({},['dateDebut','dateFin','_id'])
  } catch (error) {
    const err = new HttpError(
      'getting stages failed',
      500
    );

    return next(err);
  }

 

  res.json({stages:stages})
}



exports.getstages  = getstages ;
exports.newStage = newStage;
