const { MongoServerSelectionError } = require('mongodb');
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema =mongoose.Schema

const optionSchema =new Schema(
   { 
     nomOption : {type:String,required:true },

     etudiants:[{  type: mongoose.Types.ObjectId , ref:'Etudiant' }],

     filiere : {type:MongoServerSelectionError.Types.ObjectId,ref:'Filiere'}
    
  }
)
optionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Option',optionSchema)