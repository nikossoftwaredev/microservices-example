const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.post("/events", async (req, res) => {
  console.log("ReceivedEvent", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);

    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: { id, postId, content, status },
    });
  }
  res.send({});
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id, content, postId, status: "pending" },
  });

  res.status(201).send(comments);
});

app.listen(4001, (req, res) => {
  console.log("Listening on 4001");
});
