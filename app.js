const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "courses1" },
  { id: 2, name: "courses2" },
  { id: 3, name: "courses3" },
  { id: 4, name: "courses4" },
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/courses/api", (req, res) => {
  res.send(courses);
});

app.post("/courses/api", (res, req) => {
  if (!req.body.name || req.body.name < 3) {
    res
      .status(400)
      .send("name is required and should be minimum of 3 character");
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

app.get("/courses/api/:id", (req, res) => {
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
