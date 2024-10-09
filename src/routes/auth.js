const express = require("express");

const authRouter = express.Router()
const {validateSignUpData} = require('../utils/validation')
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const validator = require("validator")



authRouter.post("/signUp", async (req, res) => {
    try {
      validateSignUpData(req)
    
      //encrypt the password
      const {firstName,lastName,emailId,password} = req.body;
      const hashPassword = await bcrypt.hash(password,10);
      const user = new User({
        firstName,lastName,emailId,password:hashPassword
      });
   
      await user.save();
      res.send("User added successfully!");
    } catch (err) {
      res.send("ERROR: "+ err.message);
    }
  });

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      // Validate email format
      if (!validator.isEmail(emailId)) {
        throw new Error("Invalid credentials");
      }
  
      // Find the user by email
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("User not found");
      }
  
      // Compare the provided password with the stored password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      const token = await user.getJWT();
      if (isPasswordValid) {
        res.cookie("token",token, { expires: new Date(Date.now() +8* 900000)})
        res.send("User login successful!");
      } else {
        throw new Error("Invalid Credentials");
      }
  
    } catch (err) {
      console.log(err);
      res.status(400).send("Error: " + err.message);
    }
  });

authRouter.post("/logout",async(req,res)=>{
    try{
        res.cookie("token",null, { expires: new Date(Date.now())});
        res.send("User logged out successfull!!!")

    }
    catch (err) {
        console.log(err);
        res.status(400).send("Error: " + err.message);
      }
})

module.exports = authRouter;