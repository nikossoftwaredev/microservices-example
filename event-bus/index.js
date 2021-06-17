const express = require("express");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err);
  });

  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err);
  });

  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err);
  });

  res.status(201);
});

app.listen(4005, (req, res) => {
  console.log("listening on 4005");
});
