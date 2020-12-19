const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/course/api", (req, res) => {
  res.send([1, 2, 3, 4]);
});
//set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is listening on ${port}`));
