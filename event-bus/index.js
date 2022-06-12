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
  axios.post("http://localhost:4000/events", event).catch(errorLogger);

  // comment service
  axios.post("http://localhost:4002/events", event).catch(errorLogger);

  // query service
  axios.post("http://localhost:4006/events", event).catch(errorLogger);

  // broadcast to moderate service
  axios.post("http://localhost:4007/events", event).catch(errorLogger);

  res.send({ status: "OK" });
});

const errorLogger = (err) => {
  console.log(err);
};

app.listen(4005, () => {
  console.log("Listening on 4005");
});
