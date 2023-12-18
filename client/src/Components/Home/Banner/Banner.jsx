import React from "react";
import "./Banner.css";
const imageh = require("./imgs/bg-21.jpg");

function Banner() {
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageh})`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner_contents">
        <div className="banner_title">Cheap Delala</div>
        <h1 className="banner_description">
          Find Your Perfect Home: Discover a vast selection of houses for sale
          and rent on our website. Explore listings, connect with trusted
          agents, and unlock the door to your dream home today.
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </header>
  );
}

export default Banner;
