const express = require("express");

const app = express();

const connectDB = require("./config/database");

const User = require("./models/user");

app.post("/signUp", async (req, res) => {
  const user = new User({
    firstName: "Aniket",
    lastName: "Dibbe",
    emailId: "aniketdibbe@gmail.com",
    password: "Aniket@123",
  });

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (err) {
    res.send("Something went wrong!");
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
