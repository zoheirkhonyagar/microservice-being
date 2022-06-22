const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);

    comment.content = content;
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4006, async () => {
  console.log("port 4006");

  const result = await axios.get(`http://localhost:4005/events`);

  for (let event of result.data) {
    console.log(`Processing event: ${event.type}`);

    handleEvent(event.type, event.data);
  }
});
