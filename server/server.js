const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/postDB");

const postSchema = new mongoose.Schema({
  title: String,
  price: String,
  imgUrl: String,
});

const Post = mongoose.model("Post", postSchema);

const post1 = new Post({
  title: "Modern House",
  price: "32,000,000",
  imgUrl:
    "https://thumbs.dreamstime.com/b/modern-house-interior-exterior-design-46517595.jpg",
});

// post1
//   .save()
//   .then(() => {
//     console.log("posted successfully!");
//   })
//   .catch(() => {
//     console.log("Errrror");
//   });

app.get("/", (req, res) => {
  res.send("Hello from our server");
});
app.get("/test", (req, res) => {
  res.send("Hello from test route");
});
app.get("/posts", (req, res) => {
  Post.find().then((posts) => {
    console.log(posts);
    res.send(posts);
  });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
