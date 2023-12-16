// import logo from './logo.svg';
import "./App.css";
import WaitingDashboard from "./Components/WaitingDashboard/WaitingDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import PostDetail from "./Components/PostDetail/PostDetail";
import Navbar from "./Components/Navbar/Navbar";
import PostedDashboard from "./Components/PostedDashboard/PostedDashboard";
import PostedPostDetail from "./Components/PostedDashboard/PostDetail";

export const PostContext = createContext();

// const fetchData = async () => {
//   try {
//     const request1 = axios.get("/api/users");
//     const request2 = axios.get("/api/posts");

//     const response = await axios.all([request1, request2]);

//     // setUsers(response[0].data);
//     // setPosts(response[1].data);
//     // setIsLoading(false);
//   } catch (error) {
//     console.log(error);
//   }
// };

function App() {
  const [waitingPosts, setWaitingPosts] = useState([]);
  const [postedPosts, setPostedPosts] = useState([]);

  useEffect(() => {
    // Merge two GET requests into one statement

    const server = "http://localhost:8080";
    Promise.all([axios.get(`${server}/adminpost`), axios.get(`${server}/post`)])
      .then((responses) => {
        const response1 = responses[0];
        const response2 = responses[1];

        setWaitingPosts(responses[0].data);
        setPostedPosts(responses[1].data);

        console.log("Data 1:", response1.data);
        console.log("Data 2:", response2.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error or display an error message
      });
  }, [waitingPosts]);

  // useEffect(() => {
  //   fetchPosts();
  // }, [posts]);

  // const fetchPosts = () => {
  //   const server = "http://localhost:8080";
  //   axios
  //     .get(`${server}/adminpost`)
  //     .then((result) => {
  //       setPosts(result.data);
  //       // console.log("Posts: ", posts);
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     });
  // };
  return (
    <PostContext.Provider
      value={{ waitingPosts, setWaitingPosts, postedPosts, setPostedPosts }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WaitingDashboard />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/postedpostdetail/:id" element={<PostedPostDetail />} />

          <Route path="/posted/:type" element={<PostedDashboard />} />
        </Routes>
      </Router>
      {/* <DefaultDashboardLayout /> */}
    </PostContext.Provider>
  );
}

export default App;