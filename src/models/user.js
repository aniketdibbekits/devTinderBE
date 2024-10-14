const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    unique:true,
    index:true,
    lowercase:true,
    trim:true,
    required:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is not validated"+value)
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Password is not strong!"+value)
      }
    }
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender is not valid")
      }
    },
  },
  photoUrl:{
    type: String,
    default: "https://tse4.mm.bing.net/th?id=OIP.SAcV4rjQCseubnk32USHigHaHx&pid=Api&P=0&h=180",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Photourl is not validated"+value)
      }
    }
  },
  skills: {
    type: ["string"]
  }
}, { timestamps: true });

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id:user._id},"aniket",{expiresIn:"1d"});
  return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
