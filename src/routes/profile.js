const express = require("express");

const profileRouter = express.Router();

const validator = require("validator")
const User = require("../models/user");
const userAuth = require("../middlewares/auth")
const {validateEditData} = require('../utils/validation')

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    const user = req.user;
    res.send(user)
    }
    catch (err) {
      console.log(err);
      res.status(400).send("Error: " + err.message);
    }
  
  })

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditData(req)){

        
        res.status(400).send("Invalid edit request");
        }
        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save()
        res.json({message:`${loggedInUser.firstName}your profile updated successfully!!`,data:{loggedInUser}})

    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = profileRouter;