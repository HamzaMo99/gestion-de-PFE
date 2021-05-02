const HttpError = require('../models/Http-error')
const mongoose = require('mongoose')
const Etudiant =require('../models/etudiant')
const User =require('../models/user')
const user = require('../models/user')





const getstudents = async (req,res,next) =>{

    let students
    try {
        students = await Etudiant.find({},[])
    } catch (error) {
      const err = new HttpError(
        'getting students failed',
        500
      );

      return next(err);
    }

   

    res.json({students:students})
}



const getUser = async (req,res,next) =>{
  const id = req.params.id;


  console.log(id)
  let user;
   try {
       
    user = await User.findOne({ studentId: id })

  } catch (error) {
    const err = new HttpError(
      'getting user Id failed',
      500
    );

    return next(err);
  }
  
  res.json({userId:user._id})

}


exports.getstudents = getstudents;
exports.getUser=getUser;