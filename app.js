const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/course/api", (req, res) => {
  res.send([1, 2, 3, 4]);
});

app.listen(3000, () => console.log("app is listening on port 3000"));
