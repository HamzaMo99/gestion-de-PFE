const HttpError = require("../models/Http-error");
const Stage = require("../models/stage");
const mongoose = require("mongoose");
const Etudiant = require("../models/etudiant");

const User = require("../models/user");
const Enseignant = require("../models/enseignant");
const DocsAdmin = require("../models/docAdmin");
const { validationResult } = require("express-validator");

const fs = require('fs');

//get stages

const getStages = async (req, res, next) => {
  let stages;
  try {
    stages = await Stage.find({}).populate('etudiants', "nom prenom cin")
                                  
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Fetching stages failed, please try again later.",
      500
    );
    return next(error);
  }

  let user,docPFE;

  try {
    for (var i = 0; i < stages.length; i++) {
      user = await User.find({ studentId: stages[i].etudiants }
      //    [
      //   // "nom",
      //   // "prenom",
      // ]
      );

    user.map((e,index)=>{
      stages[i].etudiants[index].cin = e._id;

    })

      
    }
  } catch (er) {
    console.log(err)
    const error = new HttpError(
      "finding students failed, please try again",
      500
    );
    return next(error);
  }


  for (var i = 0; i < stages.length; i++) {
    docPFE = await  DocsAdmin.find({_id:stages[i].docs[0]}, [
      "url",
    ]);
    stages[i].docs = docPFE;
  }


  res.status(201).json({ stages: stages });
};

// get enseiganant stages 
//---------------------------------------------------------------------------------------
const getEnseigantStages = async (req, res, next) => {

  const userId = req.params.userId;
  console.log(userId);

  let userEns ;
  try {
     userEns = await User.findById(userId);
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Fetching stages failed, please try again later.",
      500
    );
    return next(error);
  }




 let enseignant;

  try {
    enseignant = await Enseignant.findById(userEns.enseignantId).populate('stages');
    
  enseignant.stages.map(stage =>{
    console.log(stage.studiants);
  })
                                  
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Fetching stages failed, please try again later.",
      500
    );
    return next(error);
  }

  res.send(enseignant);

  // let docPFE;

  // try {
  //   for (var i = 0; i < stages.length; i++) {
  //     user = await User.find({ studentId: stages[i].etudiants }
  //     //    [
  //     //   // "nom",
  //     //   // "prenom",
  //     // ]
  //     );

  //   user.map((e,index)=>{
  //     stages[i].etudiants[index].cin = e._id;

  //   })

      
  //   }
  // } catch (er) {
  //   console.log(err)
  //   const error = new HttpError(
  //     "finding students failed, please try again",
  //     500
  //   );
  //   return next(error);
  // }


  // for (var i = 0; i < stages.length; i++) {
  //   docPFE = await  DocsAdmin.find({_id:stages[i].docs[0]}, [
  //     "url",
  //   ]);
  //   stages[i].docs = docPFE;
  // }


  // res.status(201).json({ stages: stages });
};







//----------------------------------------------------------------------------------------
// add stage

const newStage = async (req, res, next) => {


  const errors = validationResult(req);
  console.log(errors)
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

   let profs = JSON.parse(selectedProfs)

  // let existingStudent = [];
  // try {
  //   if (binome == "") {
  //     existingStudent = await Stage.find({ etudiants: userId });
  //   } else {
  //     existingStudent = await Stage.find({
  //       $or: [{ etudiants: userId }, { etudiants: binome }],
  //     });
  //   }
  // } catch (err) {

  //   const error = new HttpError(
  //     "submitting stage failed, please try again",
  //     500
  //   );
  //   return next(error);
  // }

  // if (existingStudent.length > 0) {
  //   const error = new HttpError("Vous aver deja un soumission de stage .", 422);
  //   return next(error);
  // }



  let etudiants,message;

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
    enseignant = await Enseignant.find({ _id: profs });
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
    // etudiant: userId,
    enseignants: enseignant,
  });




  if(etudiants[0].stageId !=null){
    let stage;
    try {
      stage = await Stage.findById(etudiants[0].stageId)
    } catch (err) {
      const error = new HttpError(
        "finding stage failed, please try again",
        500
      );
      return next(error); 
    }
  
        try {

          stage.organismeAceuil= organisme
          stage.posteRepresentat= rep
          stage.encadrantExterne= encExterne
          stage.description= description
          stage.villeStage= ville
          stage.paysStage= pays
          stage.dateDebut= startDate
          stage.dateFin= finDate
          stage.etudiants= etudiants
          stage.enseignants= enseignant


          await stage.save();
          message="stage updated !"
          
        } catch (err) {
          const error = new HttpError(
            "Updating stage failed, please try again",
            500
          );
          return next(error); 
          
        }

  }

  else{

      
  const newDoc = new DocsAdmin({
    nom: "pfe",
    description : "pdf",
    url : req.file.path,
    type:"pfe"
  })


  const sess = await mongoose.startSession(); // open a session
  sess.startTransaction();
  newStage.etudiants = etudiants;
  // newStage.enseignants.push(enseignant)
  newStage.docs.push(newDoc);

  await newStage.save({ session: sess });
  newDoc.stageId = newStage;
  await newDoc.save();
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


  message="Le Stage est Enregistre ! "

  }

 


  


  res.status(201).json({ message: message });
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




};

// delete stage
const deleteStage = async (req, res, next) => {
  const { stageId } = req.body;

  let etudiant, stage,enseignant,document;

  try {
    stage = await Stage.findById(stageId);
  } catch (error) {
    const er = new HttpError("finding stage failed, please try again.", 500);
    return next(er);
  }

  try {
    document = await DocsAdmin.findById(stage.docs[0])
    
  } catch (error) {
    const er = new HttpError("finding document failed, please try again.", 500);
    return next(er);
  }

  try {
    const sess = await mongoose.startSession(); // open a session
    sess.startTransaction();
           try {
            for (var i = 0; i < stage.etudiants.length; i++) {
              etudiant = await Etudiant.findById(stage.etudiants[i]);
              etudiant.stageId = null;
              await etudiant.save();
             }

             fs.unlink(document.url, err => {
              
            });


          } catch (error) {
            const err = new HttpError(
              "finding students failed, please try again.",
              401
            );
            return next(err);
          }



          //enseignants

         try {
          
        
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



// get stage info

const getStageInfo = async (req, res, next) => {

  const stageId = req.params.pid;

  let etudiants, stage,docPfe;

  try {
    stage = await Stage.findById(stageId);
  } catch (error) {
    const er = new HttpError("finding stage failed, please try again.", 500);
    return next(er);
  }

  try {
    etudiants = await Etudiant.find({_id:stage.etudiants});
  } catch (error) {
    const er = new HttpError("finding stage failed, please try again.", 500);
    return next(er);
  }

  try {
    docPFE = await DocsAdmin.find({_id:stage.docs[0]});
  } catch (error) {
    const er = new HttpError("finding document failed, please try again.", 500);
    return next(er);
  }

  res.status(201).json({ stageInfo: stage,students:etudiants,docPFE:docPFE });



}

exports.newStage = newStage;
exports.getStages = getStages;
exports.validerStage = validerStage;
exports.deleteStage = deleteStage;
exports.getStageInfo = getStageInfo;
exports.getEnseigantStages = getEnseigantStages;
