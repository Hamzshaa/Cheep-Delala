import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import _ from "lodash";
import { LoginStatusContext } from "../../../App";

function PostCard(props) {
  // console.log(props?.post?.uploadedImgs[0]);
  // console.log("kdafjkdajf", props?.post?.uploadedImgs[0]);
  const id = props?.post?._id;
  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  return (
    // <Link to={{ pathname: "/postdetail", state: { parameter: id } }}>
    <Link to={_.isEqual(loginStatus, {}) ? "signup" : `/postdetail/${id}`}>
      <div className="home_post_img_wrapper">
        <p className="home_title">{props?.post?.title}</p>
        <p className="home_price">{props?.post?.price} Birr</p>
        <img src={props?.post?.uploadedImgs[0]} alt="" />
      </div>
    </Link>
  );
}

export default PostCard;
