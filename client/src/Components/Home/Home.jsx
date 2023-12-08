import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import PostCard from "./PostCard/PostCard";

function Home() {
  const [activeButton, setActiveButton] = useState("button1");
  const [postData, setPostData] = useState([]);

  let button_css = "home_button_clicked";
  function handleClick(buttonId) {
    setActiveButton(buttonId);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get("http://localhost:8080/posts");
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  console.log(postData);

  return (
    <div className="home">
      <div className="home_navbar">
        <div
          className={
            activeButton === "button1"
              ? "home_button_clicked"
              : "home_button_not_clicked"
          }
          onClick={() => handleClick("button1")}
        >
          for sale
        </div>
        <div
          className={
            activeButton === "button2"
              ? "home_button_clicked"
              : "home_button_not_clicked"
          }
          onClick={() => handleClick("button2")}
        >
          for rent
        </div>
      </div>
      <div className="home_posts">
        {activeButton === "button1" && (
          <div className="sale">
            <div className="home_post_container">
              {postData.map((post) => (
                <PostCard
                  title={post.title}
                  price={post.price}
                  imgURL={post.imgUrl}
                />
              ))}
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
              <PostCard />
            </div>
          </div>
        )}
        {activeButton === "button2" && (
          <div className="rent">
            <div className="home_post_container">
              <PostCard />
              <PostCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
