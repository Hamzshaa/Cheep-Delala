const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/postDB");

// const postSchema = new mongoose.Schema({
//   title: String,
//   price: String,
//   imgUrl: String,
// });

const messageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: [
    {
      text: String,
      time: String,
      direction: String,
    },
  ],
});

const postSchema = new mongoose.Schema({
  title: String,
  for: String,
  bedrooms: String,
  area: String,
  location: String,
  description: String,
  price: String,
  uploadedImgs: [String],
});

const Postt = mongoose.model("Postt", postSchema);
const Message = mongoose.model("Message", messageSchema);

// const post1 = new Post({
//   title: "Modern House",
//   price: "32,000,000",
//   imgUrl:
//     "https://thumbs.dreamstime.com/b/modern-house-interior-exterior-design-46517595.jpg",
// });

// post1
//   .save()
//   .then(() => {
//     console.log("posted successfully!");
//   })
//   .catch(() => {
//     console.log("Errrror");
//   });

// Message.updateOne(
//   { _id: "6575102f08a5593991b12221" },
//   {
//     $push: {
//       message: {
//         text: "ewnethn new ipsum lorem ychalal",
//         time: "11:59",
//         direction: "sent",
//       },
//     },
//   }
// )
//   .then((result) => {
//     console.log("Updated", result);
//   })
//   .catch((error) => {
//     console.log("Error Updating", error);
//   });

// const message = new Message({
//   sender: "Abebe Abamecha",
//   receiver: "Abdi Ahmed",
//   message: {
//     text: "Abdi Ahmed, lorem lorem endet ipsum?",
//     time: "01:58",
//     direction: "received",
//   },
// });

// message
//   .save()
//   .then(() => {
//     console.log("Message saved successfully");
//   })
//   .catch(() => {
//     console.log("Erororo");
//   });

app.get("/", (req, res) => {
  res.send("Hello from our server");
});
app.post("/post", (req, res) => {
  const submittedInfo = req.body;
  // Process the submittedInfo data as needed
  const post = new Postt(submittedInfo)
    .save()
    .then(() => {
      console.log("Saved to DB");
    })
    .catch((e) => {
      console.log("Error in post route:", e);
    });
  console.log(submittedInfo);
  // Perform any necessary operations or validations

  // Send a response back to the client
  res.status(200).json({ message: "Form submitted successfully" });
});
app.get("/post", (req, res) => {
  Postt.find({ title: { $exists: true } }).then((posts) => {
    // console.log(posts);
    res.send(posts);
  });
});
app.get("/posts", (req, res) => {
  Post.find().then((posts) => {
    // console.log(posts);
    res.send(posts);
  });
});
app.get("/postdetail/:id", (req, res) => {
  const postId = req.params.id;
  Post.findOne({ _id: postId }).then((post) => {
    // console.log(post);
    res.send(post);
  });
});

app.get("/messages", (req, res) => {
  Message.find().then((messages) => {
    // console.log(messages);
    res.send(messages);
  });
});
app.get("/messages/:sender/:receiver", (req, res) => {
  const sender = req.params.sender;
  const receiver = req.params.receiver;
  Message.findOne({ sender: sender, receiver: receiver }).then((messages) => {
    // console.log(messages);
    res.send(messages);
  });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
