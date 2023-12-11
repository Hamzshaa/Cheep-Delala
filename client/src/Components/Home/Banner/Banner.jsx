import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://images.unsplash.com/photo-1572811957812-aa542143b4ab?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <div className="banner_title">Cheep Delala</div>
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
