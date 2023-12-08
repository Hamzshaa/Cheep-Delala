import React from "react";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import MessageIcon from "./MessageIcon/MessageIcon";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

function Profile() {
  return (
    <div className="profile">
      <div className="profile-container">
        <img src="https://picsum.photos/250" alt="" className="profile-img" />
        <h1 className="profile-name">Hawas Muhaba</h1>
        <p className="profile-username">
          Hawasishaa<span>@cheepDelala</span>
        </p>
        <div className="profile-statuses">
          <ProfileStatus />
        </div>
        <MessageIcon />
      </div>
      <div>
        <ProfileInfo />
      </div>
    </div>
  );
}

export default Profile;
