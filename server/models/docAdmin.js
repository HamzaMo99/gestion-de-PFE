const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema =mongoose.Schema

const docSchema =new Schema(
   { 
     nom: {type:String,required:true },
     description : {type:String,required },
     stageId:{  type: mongoose.Types.ObjectId, ref:'Stage' }
}
)
docSchema.plugin(uniqueValidator);

module.exports = mongoose.model('DocAdmin',docSchema)