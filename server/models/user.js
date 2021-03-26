const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const Schema =mongoose.Schema

const UserSchema =new Schema(
   {
     userName : {type:String,required:true,unique:true },
     password: {type:String,required:true },
     admin: {type:String,default: '0' },
     userId:{  type: mongoose.Types.ObjectId ,required:true, ref:'Etudiant' }
 

}
)
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',UserSchema)