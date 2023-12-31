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

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmation: { type: String, required: true },
  phoneNu: { type: String, required: false },
  location: { type: String, required: false },
  profileImg: String,
  additional_info: {
    profile_pic_url: String,
    bio: String,
    username: String,
    location: String,
  },
});
const User = mongoose.model("User", userSchema);

// const messageSchema = new mongoose.Schema({
//   sender: String,
//   receiver: String,
//   message: [
//     {
//       text: String,
//       time: String,
//       direction: String,
//     },
//   ],
// });
const messageSchema = new mongoose.Schema({
  user1: userSchema,
  user2: userSchema,
  message: [
    {
      text: String,
      time: String,
      sender: String,
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
  time: String,
  uploadedImgs: [String],
});

const ApprovedPost = mongoose.model("ApprovedPost", postSchema);
const Post = mongoose.model("Post", postSchema);

app.post("/adminpost", (req, res) => {
  const submittedInfo = req.body;
  const post = new ApprovedPost(submittedInfo)
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
    res.send(posts);
  });
});

app.delete("/adminpost/:id", (req, res) => {
  const postId = req.params.id;
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

app.post("/post", (req, res) => {
  const submittedInfo = req.body;
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
  res.status(200).json({ message: "Form submitted successfully" });
});

app.get("/post", (req, res) => {
  ApprovedPost.find({ title: { $exists: true } }).then((posts) => {
    res.send(posts);
  });
});

app.delete("/post/:id", (req, res) => {
  const postId = req.params.id;
  ApprovedPost.findOneAndDelete({ _id: postId })
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
    res.send(posts);
  });
});
app.get("/postdetail/:id", (req, res) => {
  const postId = req.params.id;
  ApprovedPost.findOne({ _id: postId }).then((post) => {
    res.send(post);
  });
});

app.get("/adminpostdetail/:id", (req, res) => {
  const postId = req.params.id;
  Post.findOne({ _id: postId }).then((post) => {
    res.send(post);
  });
});

app.get("/messages", (req, res) => {
  Message.find().then((messages) => {
    res.send(messages);
  });
});
app.get("/messages/:user1/:user2", (req, res) => {
  const user1 = req.params.user1;
  const user2 = req.params.user2;

  Message.findOne({
    $or: [
      { "user1._id": user1, "user2._id": user2 },
      { "user1._id": user2, "user2._id": user1 },
    ],
  })
    .then((message) => {
      res.send(message);
    })
    .catch((e) => {
      console.log("Error in get msg route: ", e);
    });

  // Message.findOne({ sender: sender, receiver: receiver }).then((messages) => {
  //   res.send(messages);
  // });
});

app.post("/messages/:user1/:user2", (req, res) => {
  // const user1 = req.params.user1;
  // const user2 = req.params.user2;
  const user1 = req.body.user1;
  const user2 = req.body.user2;
  const newMessage = req.body.message;

  console.log(user1, user2, newMessage);

  const filter = {
    $or: [
      { "user1._id": user1, "user2._id": user2 },
      { "user1._id": user2, "user2._id": user1 },
    ],
  };
  console.log("fileter: ", filter);
  const update = { $push: { message: newMessage } };

  Message.updateOne(filter, update)
    .then(() => {
      res.status(200).send("Message added successfully");
    })
    .catch((error) => {
      console.log("Error updating message:", error);
      res.status(500).send("Error updating message");
    });

  // Message.findOne({
  //   $or: [
  //     { sender: sender, receiver: receiver },
  //     { sender: receiver, receiver: sender },
  //   ],
  // })
  //   .then((message) => {
  //     if (!message){

  //       console.log("Message not found");
  //     }
  //   })
  //   .catch((e) => {
  //     console.log("Message Error: ", e);
  //   });
  // Message.findOne({ sender: sender, receiver: receiver }).then((messages) => {
  //   res.send(messages);
  // });
});

app.post("/messageslist/:sender/:receiver", (req, res) => {
  const newChat = req.body.chat;

  // const sender = req.params.sender;
  // const receiver = req.params.receiver;
  // const newMessage = req.body.message;
  // console.log(sender, receiver, newMessage);
  // const filter = { sender: sender, receiver: receiver };
  // const update = { $push: { message: newMessage } };

  // Message.updateOne(filter, update)
  //   .then(() => {
  //     res.send("Message added successfully");
  //   })
  //   .catch((error) => {
  //     console.log("Error updating message:", error);
  //     res.status(500).send("Error updating message");
  //   });
  // console.log(newChat);
  const user1 = newChat.user1;
  const user2 = newChat.user2;

  Message.findOne({
    $or: [
      { "user1._id": user1._id, "user2._id": user2._id },
      { "user1._id": user2._id, "user2._id": user1._id },
    ],
  })
    .then((message) => {
      if (!message) {
        const newChatList = new Message(newChat);

        newChatList
          .save()
          .then(() => {
            console.log("new chat saved to db successfully");
            res.status(200).json({ message: "Data received successfully" });
          })
          .catch((error) => {
            console.log("Error saving new chat: ", error);
            res
              .status(500)
              .json({ error: "An error occurred while saving the user" });
          });

        console.log("Message not found");
      } else {
        console.log("Message found");
      }
    })
    .catch((e) => {
      console.log("Message Error: ", e);
    });
});

app.get("/messagelists/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("userId", userId);
  Message.find({
    $or: [{ "user1._id": userId }, { "user2._id": userId }],
  })
    .then((lists) => {
      console.log("lists: ", lists);
      res.send(lists);
      // res.status(200).json(lists);
    })
    .catch((err) => {
      console.log(err);
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

app.get("/user", (req, res) => {
  User.find().then((users) => {
    res.send(users);
  });
});

app.delete("/user/:id", (req, res) => {
  const postId = req.params.id;
  User.findOneAndDelete({ _id: postId })
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

app.get("/profiledetail/:userId", (req, res) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while finding the user" });
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
