const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");
// const cors = require("cors");

const app = express();
app.use(json());
// app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;

  console.log(event);

  // post service
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err);
  });

  // comment service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err);
  });

  // query service
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
