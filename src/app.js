const express = require("express");

const app = express();
app.use("/", (req, res) => {
  res.send("Hello from home page!");
});

app.use("/test", (req, res) => {
  res.send("Hello world!");
});
app.listen(3000, () => {
  console.log("Server is Up!");
});
