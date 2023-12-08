import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard(props) {
  return (
    <Link to="/postdetail">
      <div className="home_post_img_wrapper">
        <p className="home_title">{props.title}</p>
        <p className="home_price">{props.price} Birr</p>
        <img src={props.imgURL} alt="" />
      </div>
    </Link>
  );
}

export default PostCard;
