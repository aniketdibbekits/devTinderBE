const express = require("express");
const app = express();
const {validateSignUpData} = require('./utils/validation')
app.use(express.json())
const connectDB = require("./config/database");
const validator = require("validator")
const User = require("./models/user");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth")

app.use(cookieParser())

app.post("/signUp", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile",userAuth,async(req,res)=>{
  try{
  const user = req.user;
  res.send(user)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }

})


//single user api get("/user");

app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId;
 
try{
  const user = await User.findOne({emailId:userEmail});
  if(!user){
    res.status(404).send("User not found")
  }
  else{
    res.send(user)

  }

}
catch(err){
  res.status(400).send("Something went wrong")
}
  
})

//feed api get ("/feed")
app.get("/feed",async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users)

  }
  catch(err){
    console.log(err)
    res.status(400).send("Something went wrong")
  }
});




connectDB()
  .then(() => {
    console.log("Connectes to DB");
    app.listen(7777, () => {
      console.log("Server is Up!");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection to DB failed");
  });
