const HttpError = require("../models/Http-error");
const Stage = require("../models/stage");
const mongoose = require("mongoose");
const Etudiant = require("../models/etudiant");
const Enseignant = require("../models/enseignant");
const { validationResult } = require("express-validator");

//get stages

const getStages = async (req, res, next) => {
  let stages;
  try {
    stages = await Stage.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching stages failed, please try again later.",
      500
    );
    return next(error);
  }

  let etudiants;

  try {
    for (var i = 0; i < stages.length; i++) {
      etudiants = await Etudiant.find({ _id: stages[i].etudiants }, [
        "nom",
        "prenom",
      ]);
      stages[i].etudiants = etudiants;
    }
  } catch (er) {
    const error = new HttpError(
      "finding students failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ stages: stages });
};

// add stage

const newStage = async (req, res, next) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("certains champs saisient invalide", 422));
  }
  const {
    binome,
    email,
    tel,
    organisme,
    rep,
    encExterne,
    description,
    ville,
    pays,
    selectedProfs,
    startDate,
    finDate,
    userId,
  } = req.body;

  let existingStudent = [];
  try {
    if (binome == "") {
      existingStudent = await Stage.find({ etudiants: userId });
    } else {
      existingStudent = await Stage.find({
        $or: [{ etudiants: userId }, { etudiants: binome }],
      });
    }
  } catch (err) {

    const error = new HttpError(
      "submitting stage failed, please try again",
      500
    );
    return next(error);
  }

  if (existingStudent.length > 0) {
    const error = new HttpError("Vous aver deja un soumission de stage .", 422);
    return next(error);
  }

  let etudiants;

  try {
    if(binome==""){
      etudiants = await Etudiant.find({ _id: userId });

    }else{
    etudiants = await Etudiant.find({ _id: [userId, binome] }); }
  } catch (er) {
    const error = new HttpError(
      "finding students failed, please try again",
      500
    );
    return next(error);
  }


  let enseignant; //les encadrant interne
  try {
    enseignant = await Enseignant.find({ _id: selectedProfs });
  } catch (er) {
    const error = new HttpError(
      "finding enseignants failed, please try again.",
      500
    );
    return next(error);
  }

  const newStage = new Stage({
    organismeAceuil: organisme,
    posteRepresentant: rep,
    encadrantExterne: encExterne,
    description: description,
    villeStage: ville,
    paysStage: pays,
    dateDebut: startDate,
    dateFin: finDate,
    etudiant: userId,
    enseignants: enseignant,
  });

  const sess = await mongoose.startSession(); // open a session
  sess.startTransaction();
  newStage.etudiants = etudiants;
  // newStage.enseignants.push(enseignant)

  await newStage.save({ session: sess });

  //  enseignant[1].stages.push(newStage)
  // await enseignant[1].save();
  enseignant.map(async (e) => {
    e.stages.push(newStage);
    await e.save();
  });

  etudiants.map(async (e) => {
    e.stageId = newStage;
    e.tel = tel;
    e.email = email;
    await e.save();
  });

  // etudiant.stageId=newStage;
  // etudiant.tel=tel;
  // etudiant.email=email;
  // await etudiant.save();

  sess.commitTransaction();
  try {
  } catch (er) {
    const error = new HttpError(
      "submitting stage failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ message: "stage submitted" });
};

// Valider une stage
const validerStage = async (req, res, next) => {
  const { stageId } = req.body;

  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (er) {
    const error = new HttpError("finding stage failed, please try again.", 500);
    return next(error);
  }

  if (!stage) {
    const err = new HttpError("finding stage failed, please try again.", 401);
    return next(err);
  }

  if(stage.signatureDept=="1"){
    stage.signatureDept = 0;
    await stage.save();
    res.status(201).json({ message: "stage invalider" });
  
  }else{
    stage.signatureDept = 1;
    await stage.save();
    res.status(201).json({ message: "stage valider" });
  }



  stage.signatureDept = 1;



};

// delete stage
const deleteStage = async (req, res, next) => {
  const { stageId } = req.body;

  let etudiant, stage,enseignant;

  try {
    stage = await Stage.findById(stageId);
  } catch (error) {
    const er = new HttpError("finding stage failed, please try again.", 500);
    return next(er);
  }

  try {
    const sess = await mongoose.startSession(); // open a session
    sess.startTransaction();
       console.log("1")
           try {
            for (var i = 0; i < stage.etudiants.length; i++) {
              etudiant = await Etudiant.findById(stage.etudiants[i]);
              etudiant.stageId = null;
              await etudiant.save();
             }
          } catch (error) {
            const err = new HttpError(
              "finding students failed, please try again.",
              401
            );
            return next(err);
          }



          //enseignants

         try {
            console.log("2")
        
              await Enseignant.updateMany( // select your doc in moongo
                {_id:stage.enseignants }, // your query, usually match by _id
                { $pull: { stages:stage._id  } }, // item(s) to match from array you want to pull/remove
                { multi: true } // set this to true if you want to remove multiple elements.
               )
              
            }
            
           catch (error) {
              const err = new HttpError(
                "finding teachers failed, please try again.",
                401
              );
              return next(err);
            }



            
          console.log("3")

           try {
            stage = await Stage.findByIdAndRemove(stageId)
          } catch (er) {
            const error = new HttpError(
              "finding stage failed, please try again.",
              500
            );
            return next(error);
          }

          console.log("4")


      sess.commitTransaction();


  } catch (er) {
    const error = new HttpError(
      "deleting stage failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ message: "stage deleted" });

};

exports.newStage = newStage;
exports.getStages = getStages;
exports.validerStage = validerStage;
exports.deleteStage = deleteStage;
