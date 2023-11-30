import React from "react";
import "./PostDetail.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import PostCard from "./PostCard";

function PostDetail() {
  return (
    <div className="post-detail">
      <div className="post-detail-info ">
        <div className="post-detail-imgs ">
          <div className="post-detail-row row">
            <img src="https://picsum.photos/200" alt="" className="col" />
          </div>
          <div className="post-detail-row row">
            <img src="https://picsum.photos/200" alt="" className="col-4" />
            <img src="https://picsum.photos/200" alt="" className="col-4" />
            <img src="https://picsum.photos/200" alt="" className="col-4 " />
          </div>
        </div>
        <div className="post-detail-sideinfo">
          <h1>12 room Apartment</h1>
          <h2>15,000,000 Birr</h2>
          <h3>Description</h3>
          <p>
            Since not all fonts are available on all computers (there are
            thousands of fonts, and most are not free), CSS provides a system of
            fallbacks. You list the font that you want first, then any fonts
            that might fill in for the first if it is unavailable
          </p>
          <Link to="/messages">
            <div className="send-message-btn">
              <span className="btn-txt">Send Message</span>
            </div>
          </Link>
          <div className="post-detail-soical-medias">
            <FontAwesomeIcon
              icon={faFacebook}
              className="social-links"
              style={{ color: "#3b5998" }}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="social-links"
              style={{ color: "#55acee" }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              className="social-links"
              style={{ color: "#ac2bac" }}
            />
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="social-links"
              style={{ color: "#0082ca" }}
            />
            <FontAwesomeIcon
              icon={faPinterest}
              className="social-links"
              style={{ color: "#c61118" }}
            />
          </div>
        </div>
      </div>
      <div className="suggestion">
        <h1>You may also like</h1>
        <div className="suggestion-row">
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />

          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
          <PostCard url="https://picsum.photos/300/200" title="House Title" />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
