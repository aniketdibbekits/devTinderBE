const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://aniket:KQakZAGXP1tvOrpe@nodelearn.itbdx.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
