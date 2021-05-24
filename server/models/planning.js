const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema =mongoose.Schema

const planningSchema =new Schema(
   { jour : {type:String,required:true },
    heureDebut : {type:String},
    heureFin : {type:String },
    stageId:{  type: mongoose.Types.ObjectId, ref:'Stage' },
    jury:[{ enseignant:{  type: mongoose.Types.ObjectId , ref:'Enseignant' },role:{type:String,required:true }}],
    salle : {type:Array}
    
}
)
planningSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Planning',planningSchema)