const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async(req, res, next) => {
  try{
  const cookies =await req.cookies;
  const {token} = cookies;
  if(!token){
    throw new Error("Invalid Token")
  }
  const decodedMessage = jwt.verify(token,"aniket");
  const {_id} = decodedMessage;
  const user = await User.findById(_id);
  if(!user){
    throw new Error("User not found")
  }
  req.user = user;
  next()
  }
  catch(err){
    res.send("Error:"+err.message)
  }
};

module.exports = userAuth;
