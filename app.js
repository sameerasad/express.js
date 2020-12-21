const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/course/api", (req, res) => {
  res.send([1, 2, 3]);
});
app.get("/course/api/post/:year/:months", (req, res) => {
  res.send(req.querry);
});
//export PORT=5000;

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`app is listening on ${port}`));
