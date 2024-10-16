const express = require("express");

const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    if(fromUserId==toUserId){
      return res.status(400).json({
        message:"Cannot send request to yourself!"
      })
    }


    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({
        message:"User not found!!"
      })
    }

    const allowedStatus = ["interested","ignored"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:"invalid status type",
        status
      })
    }

    const existingConnection = await ConnectionRequest.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if(existingConnection){
     return res.status(400).json({
        message:"Connection request already exist!!"
      })
    }


    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();
    res.json({
      message:req.user.firstName+" "+status+" "+toUser.firstName,
      data,
    })
   
    }
    catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  
  })

  requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
      const {status,requestId} = req.params;
      const loggedInUser = req.user;

      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({
          message:"Status not allowed",
          data:status
        })
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser,
        status:"interested"
      })
      if(!connectionRequest){
        return res.status(404).json({
          message:"Connection request not found"
        })
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(200).json({
        message:"Connection request is"+ " "+status,
        data:data
      })

    }
    catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  })

module.exports = requestRouter;