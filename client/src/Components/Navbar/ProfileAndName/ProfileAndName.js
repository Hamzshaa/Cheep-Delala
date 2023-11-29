import React from "react";
import "./ProfileAndName.css";
import { Link } from "react-router-dom";

function ProfileAndName() {
  return (
    <div className="miniprofile">
      <Link to="/profile">
        <div className="miniprofile-img">
          <img
            src="https://picsum.photos/100"
            alt=""
            className="miniprofile-img"
          />
        </div>
      </Link>
      <Link to="/profile">
        <h1>Hawas Muhaba</h1>
      </Link>
      <Link to="/miniprofile">
        <p>hawasmuhaba123@gmail.com</p>
      </Link>
    </div>
  );
}

export default ProfileAndName;
