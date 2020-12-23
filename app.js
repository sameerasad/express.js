const express = require("express");
const Joi = require("joi");
const app = express();
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
app.get("/courses/api/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("you entered item is not here please search by right id!");
  res.send(course);
});

app.post("/courses/api", (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//update the course by id
app.put("/courses/api/:id", (req, res) => {
  //lookup the courses
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id is not found");

  //validate the course

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update the course

  course.name = req.body.name;
  res.send(course);
});

app.delete("/courses/api/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given id is not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//export PORT=5000;

const port = process.env.PORT || 3000;
console.log(port);
app.listen(port, () => console.log(`app is listening on ${port}`));

const validate = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};
