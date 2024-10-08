const express = require("express");

const profileRouter = express.Router();

const validator = require("validator")
const User = require("../models/user");
const userAuth = require("../middlewares/auth")

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
    const user = req.user;
    res.send(user)
    }
    catch (err) {
      console.log(err);
      res.status(400).send("Error: " + err.message);
    }
  
  })

module.exports = profileRouter;