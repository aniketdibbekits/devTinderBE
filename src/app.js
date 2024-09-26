const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ Name: "Aniket" });
});
app.use("/test/abc", (req, res) => {
  res.send("Hello world abc!");
});

app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use("/", (req, res) => {
  res.send("Hello from home page!");
});

app.listen(3000, () => {
  console.log("Server is Up!");
});
