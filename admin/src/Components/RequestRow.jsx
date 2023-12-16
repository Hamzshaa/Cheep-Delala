import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";
import { PostContext } from "../App";
import { useContext } from "react";

function RequestRow(props) {
  const id = props.post._id;
  const { posts, setPosts } = useContext(PostContext);

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8080/adminpost/${id}`)
      .then((response) => {
        console.log("Post deleted successfully");
        // Handle the response or perform any necessary actions
        const filteredObj = Object.fromEntries(
          Object.entries(posts).filter(([key]) => posts[key]._id !== id)
        );

        setPosts(filteredObj);
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        // Handle the error or display an error message
      });
  }

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/adminpost",
        props.post
      );
      handleDelete(id);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form", error);
    }
    console.log("Approve id: ", id);

    // console.log(`Approving post request with ID: ${id}`);
  };

  function handleReject(id) {
    // window.location.reload();
    handleDelete(id);
    console.log("Reject id: ", id);
  }

  //   <Link to={_.isEqual(loginStatus, {}) ? "signup" : `/postdetail/${id}`}

  return (
    <div key={id} className="post-request">
      <div className="poster">
        <img src={props.img} alt="" />

        {props.post?.user?.name}
      </div>
      <Link to={`/postdetail/${id}`} className="title">
        {props.post.title}
      </Link>
      <div className="purpose">{props.post.for}</div>
      <div className="time">{props.time}</div>
      <div className="actions">
        <button className="approve" onClick={() => handleApprove(id)}>
          Approve
        </button>
        <button className="reject" onClick={() => handleReject(id)}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default RequestRow;
