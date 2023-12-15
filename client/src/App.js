// import logo from "./logo.svg";
// eslint-disable-next-line
import axios from "axios";
import "./App.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Messages from "./Components/Messages/Messages";
import SavedItems from "./Components/SavedItems";
import Post from "./Components/Post/Post";
import Settings from "./Components/Settings";
import HelpAndSupports from "./Components/HelpAndSupport";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/Registration/SignUp";
import SignIn from "./Components/Registration/SignIn";
import PostDetail from "./Components/PostDetail/PostDetail";
import FourOFour from "./Components/FourOFour";
import React, { useState } from "react";

// const apiCall = () => {
//   const server = "http://localhost:8080";
//   axios
//     .get(`${server}/posts`)
//     .then((data) => {
//       console.log(data.data);
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//     });
// };

export const LoginStatusContext = React.createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState({});

  function loginStatusHandler(user) {
    setLoginStatus(user);
  }

  // const apiCall = () => {
  //   const server = "http://localhost:8080";
  //   axios
  //     .get(`${server}/login`)
  //     .then((result) => {
  //       setLoginStatus(result.data);
  //       console.log(result.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error: ", err);
  //     });
  // };

  return (
    <LoginStatusContext.Provider value={{ loginStatus, loginStatusHandler }}>
      <Router>
        <Navbar />
        <Routes>
          {/* <div className="App">
          <header className="App-header"> */}
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/saveditems" element={<SavedItems />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpAndSupports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/*" element={<FourOFour />} />
          {/* <button onClick={apiCall}>Make API Call</button> */}
          {/* </header>
        </div> */}
        </Routes>
      </Router>
    </LoginStatusContext.Provider>
  );
}

export default App;
