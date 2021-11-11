const express = require("express");
const { json } = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({
    id: commentId,
    content,
  });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
