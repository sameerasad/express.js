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

app.post("/courses/api", (res, req) => {
  const schema = {
    name: Joi.string().min().required(),
  };
  const result = joi.validate(req.body, schema);
  console.log(result);
  if (result.error) {
    res.status(400).send(result.error.detail[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  app.put("/courses/api/:id", (req, res) => {
    /*
    1)look up the course
    2)if not exist return status(404)
    3)validate the course
    4)if not valid return (400)means bad request
    5)if valid
       update the course
       return the course in response*/

    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      res
        .status(404)
        .send("entered item is not here please search by right id!");

    const schema = {
      name: Joi.string().min().required(),
    };
    const result = joi.validate(req.body, schema);
    console.log(result);
    if (result.error) {
      res.status(400).send(result.error.detail[0].message);
      return;
    }

    course.name = req.body.name;
    res.send(course);
  });

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
