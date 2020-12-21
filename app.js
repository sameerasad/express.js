const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/course/api", (req, res) => {
  res.send(courses);
});
app.get("/course/api/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res
      .status(404)
      .send("you entered item is not here please search by right id!");
  res.send(course);
});

//export PORT=5000;

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`app is listening on ${port}`));
