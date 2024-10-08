const express = require("express");

const requestRouter = express.Router();
const userAuth = require("../middlewares/auth")

requestRouter.get("/sendconnectionRequest",userAuth,async(req,res)=>{
    try{
    const user = req.user;
    res.send(user)
    }
    catch (err) {
      console.log(err);
      res.status(400).send("Error: " + err.message);
    }
  
  })

module.exports = requestRouter;