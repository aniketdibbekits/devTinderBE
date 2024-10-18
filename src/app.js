const express = require("express");
const app = express();
app.use(express.json())
const connectDB = require("./config/database");
const userAuth = require("./middlewares/auth")
const cookieParser = require("cookie-parser");

app.use(cookieParser())

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/user')

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter);
app.use("/",userRouter);


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
