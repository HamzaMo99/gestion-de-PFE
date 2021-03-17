const HttpError = require('../models/Http-error')
const User = require('../models/user')


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
            'invalid credentials,could not log you in.',
            401
        );
        return next(err)
    }

    res.json({message:'logged in hamzza',user:user})

    res.json({users})
}


// ADd user



const addUser= async(req,res,next) =>{
    const { userName,password} = req.body;
    const newUser = new User({
        userName,
        password
    });

    let user ;
    try {
        await newUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
          );
          return next(error);
        
    }

    res.status(201).json({user:newUser});
}

exports.login = login;
exports.addUser = addUser;