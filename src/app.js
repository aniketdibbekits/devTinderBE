const express = require("express");

const app = express();

app.use(express.json())
const connectDB = require("./config/database");

const User = require("./models/user");

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.send("Something went wrong!");
  }
});

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

app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted succesfully")
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
});

//update the user
app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body;
  // console.log(userId,data)
  try{
    const user = await User.findByIdAndUpdate({_id:userId},data,{
      runValidators:true
    });
    res.send("User updated successfully");
  }
  catch(err){
    res.status(400).send("Something went wrong")
  }
})

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
