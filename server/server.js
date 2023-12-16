const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/postDB");

// const postSchema = new mongoose.Schema({
//   title: String,
//   price: String,
//   imgUrl: String,
// });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmation: { type: String, required: true },
  phoneNu: { type: String, required: false },
  location: { type: String, required: false },
  additional_info: {
    profile_pic_url: String,
    bio: String,
    username: String,
    location: String,
  },
});
const User = mongoose.model("User", userSchema);

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
const Message = mongoose.model("Message", messageSchema);

const postSchema = new mongoose.Schema({
  user: userSchema,
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
const Post = mongoose.model("Post", postSchema);

app.post("/adminpost", (req, res) => {
  // const postId = req.params.id;
  const submittedInfo = req.body;

  // console.log(submittedInfo);
  // Post.findOne({ _id: postId }).then((post) => {
  // console.log(post);
  const post = new Postt(submittedInfo)
    .save()
    .then(() => {
      console.log("Saved to DB, in adminpost route");
      res.status(200).json({ message: "Form submitted successfully" });
    })
    .catch((e) => {
      console.log("Error in post route:", e);
      res.status(500).json({ message: "Error in saving the post" });
    });
});
app.get("/adminpost", (req, res) => {
  Post.find({ title: { $exists: true } }).then((posts) => {
    // console.log(posts);
    res.send(posts);
  });
});

app.delete("/adminpost/:id", (req, res) => {
  const postId = req.params.id;

  console.log("QNNNNNN", postId);
  // Perform any necessary operations or validations
  // For example, you might want to check if the post exists and if the user has the necessary permissions to delete it.

  // Assuming you have a Post model or database collection
  Post.findOneAndDelete({ _id: postId })
    .then((deletedPost) => {
      console.log(deletedPost);
      if (!deletedPost) {
        console.log("Post not found");
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
      console.log("Post deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Error deleting post" });
    });
});

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
  if (
    submittedInfo.hasOwnProperty("title") &&
    submittedInfo.user &&
    submittedInfo.user.confirmation &&
    submittedInfo.user.password &&
    submittedInfo.user.email &&
    submittedInfo.user.name
  ) {
    const post = new Post(submittedInfo)
      .save()
      .then(() => {
        console.log("Saved to DB");
      })
      .catch((e) => {
        console.log("Error in post route:", e);
      });
  }
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

app.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  Postt.findOneAndDelete({ _id: postId })
    .then((deletedPost) => {
      console.log(deletedPost);
      if (!deletedPost) {
        console.log("Post not found");
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
      console.log("Post deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Error deleting post" });
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
  Postt.findOne({ _id: postId }).then((post) => {
    // console.log(post);
    res.send(post);
  });
});

app.get("/adminpostdetail/:id", (req, res) => {
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

app.post("/userData", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const newUser = new User(userInfo);

  newUser
    .save()
    .then(() => {
      console.log("user saved to the database successfully");
      res.status(200).json({ message: "Data received successfully" });
    })
    .catch((error) => {
      console.log("Error saving user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the user" });
    });
});

app.post("/login", function (req, res) {
  const userInputedEmail = req.body.email;
  const userInputedPassword = req.body.password;

  console.log("login route: ", userInputedEmail, userInputedPassword);

  User.findOne({ email: userInputedEmail })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password === userInputedPassword) {
          res.status(200).json(foundUser);
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
    });
});

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
