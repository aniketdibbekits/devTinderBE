const express = require("express");

const app = express();

app.use(
  "/route",
  (req, res, next) => {
    res.send("hiii 1");
    next();
  },
  (req, res) => {
    res.send("hiii 2");
  }
);

app.listen(3000, () => {
  console.log("Server is Up!");
});
