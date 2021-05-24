const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema =mongoose.Schema

const enseignantSchema =new Schema(
   {
    nom : {type:String,required:true },
    prenom : {type:String,required:true },
    email : {type:String,required:true },
    specialite : {type:String,required:true },
    stages: [{  type: mongoose.Types.ObjectId ,required:true, ref:'Stage' }]


}
)
enseignantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Enseignant',enseignantSchema)