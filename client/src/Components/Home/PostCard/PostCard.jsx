import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard(props) {
  console.log(props?.post?.uploadedImgs[0]);
  return (
    <Link to={`/postdetail/${props?.post?.id}`}>
      <div className="home_post_img_wrapper">
        <p className="home_title">{props?.post?.title}</p>
        <p className="home_price">{props?.post?.price} Birr</p>
        <img src={props?.post?.uploadedImgs[0]} alt="" />
      </div>
    </Link>
  );
}

export default PostCard;
