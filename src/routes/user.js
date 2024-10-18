const express = require('express');
const userAuth = require('../middlewares/auth');
const connectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await connectionRequest.find({
            toUserId:loggedInUser,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])
        res.status(200).json({
            message:"Data fetched successfully",
            data:connectionRequests
        })

    }
    catch(err){
        res.status(400).send("Error"+err.message);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",["firstName","lastName","photoUrl","skills","age","emailId","gender"])
        .populate("toUserId",["firstName","lastName","photoUrl","skills","age","emailId","gender"]);;

        const data = connectionRequests.map((row=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        

        }
    ))
            

        res.status(200).json({
            message:"Data fetched successfully",
            data:data
        })
        
    }
    catch(err){
        res.status(400).send("Error"+err.message)
    }
});

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            //find all users which are not in hideusersfrom feed array and not my own card
            $and:
            [
                {_id:{$nin: Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}  

            ]
      }).select("firstName lastName age gender photoUrl skills")
        res.status(200).json({
            message:"Data fetched successfully!",
            data:users
        })

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports = userRouter;