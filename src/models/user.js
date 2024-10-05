const mongoose = require("mongoose");

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
    lowercase:true,
    trim:true,
    required:true,
  },
  password: {
    type: String,
    required:true,
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
    default: "abcd"
  },
  skills: {
    type: ["string"]
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
