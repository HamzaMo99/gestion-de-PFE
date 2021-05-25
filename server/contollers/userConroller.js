const HttpError = require('../models/Http-error')
const User = require('../models/user')
const mongoose = require('mongoose')
const Etudiant =require('../models/etudiant')
const Filiere =require('../models/filiere')
const Enseignant = require('../models/enseignant')
const Stage = require("../models/stage");


// Login 


const login = async (req,res,next) =>{

    const {username,password} = req.body;
    let user;
    try {
        user = await User.findOne({userName:username})
    } catch (error) {
      const err = new HttpError(
        'logging in failed,please try again later',
        500
      );

      return next(err);
    }

    if (!user || user.password !== password) {
        const err= new HttpError(
            'logging in failed,please try again later.',
            401
        );
        return next(err)
    }
    
    let responsedata,role,stageInfo;
    if(user.typeUser==='0')
    {
      responsedata=await Etudiant.findById(user.studentId)
      filiere = await Filiere.findById(responsedata.filiere)
      responsedata.filiere = filiere;
      role='0';
      if(responsedata.stageId !=null){
        console.log("helloo")

       try {
        stageInfo = await Stage.findById(responsedata.stageId)
        responsedata.set('stage',stageInfo,{strict:false});
        console.log(responsedata)
       } catch (error) {
         console.log(error)
       }
        
      }

    }

    if(user.typeUser==='1')
    {
      responsedata=await Enseignant.findById(user.enseignantId)
      role='1';

    }
    if(user.typeUser==='2')
    {     
      role='2';
      responsedata=user
    }

    res.json({message:'logged in',user:responsedata,role:role,userId:user._id})
}



const addUser= async(req,res,next) =>{
    const { cne,cin,nom,prenom,dateNaissance,genre,matricule,telephone,filiere,promotion,userName,password} = req.body;
   


    let existingStudent
    let existingUser
    try {
      existingStudent = await Etudiant.findOne({ cne:cne })
      existingUser = await User.findOne({userName:userName})
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser || existingStudent) {
      const error = new HttpError(
        'Student exists already, please login instead.',
        422
      );
      return next(error);
    }
      
    let nomfiliere ;

    try {
         nomfiliere = await Filiere.findOne({idFiliere:filiere})
        
    } catch (er) {
        const error = new HttpError(
            'finding filiere failed, please try again.',
            500
          );
          return next(error); 
        
    }
    if(nomfiliere== null){
      const error = new HttpError(
        'finding filiere failed, please try again.',
        500
      );
      return next(error);
    }

    const newStudent = new Etudiant({
        cne,cin,nom,prenom,dateNaissance,genre,matricule,telephone,promotion
    });

    const newUser = new User({
        userName,
        password,
        admin:'0'
    })



   try { 
    const sess = await mongoose.startSession();    // open a session 
    sess.startTransaction();
    newStudent.filiere=nomfiliere;            
    await newStudent.save({session:sess});
    newUser.userId=newStudent;
    await newUser.save({session:sess});
    nomfiliere.etudiants.push(newStudent)
    await nomfiliere.save();

    sess.commitTransaction();
   
       
   } catch (er) {
    const error = new HttpError(
        'Adding student failed, please try again.',
        500
      );
      return next(error);    
   }
    

    res.status(201).json({student:newStudent,user:newUser});
}

exports.login = login;
exports.addUser = addUser;