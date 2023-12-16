import React, { useState, useContext } from "react";
import PostedRow from "./PostedRow";
import { PostContext } from "../../App";
import { useParams } from "react-router-dom";
// import axios from "axios";

function PostedDashboard() {
  const { type } = useParams();
  const { postedPosts } = useContext(PostContext);
  console.log(type);

  const posts = {};
  const handleReject = (id) => {
    console.log(`Rejecting post request with ID: ${id}`);
    // Add your logic to handle post rejection
  };

  return (
    <div className="dashboard container">
      <h1>{type} dashboard</h1>
      <li className="post-request post-list-header">
        <div className="poster">poster</div>
        <div className="title">title</div>
        <div className="time bold">time</div>
        <div className="actions"></div>
      </li>
      {Object.keys(postedPosts).map((key) => {
        const post = postedPosts[key];
        // console.log("li", posts);
        if (post.for === type) {
          return <PostedRow post={post} handleReject={handleReject} />;
        }
      })}
    </div>
  );
}

export default PostedDashboard;
