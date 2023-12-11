import React, { useState } from "react";
import "./Profile.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import MessageIcon from "./MessageIcon/MessageIcon";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PhotoUploader from "./PhotoUploader";

function Profile() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedPhoto(file);
  //   // console.log(URL.createObjectURL(file));
  // };

  // function handleUpload(event) {
  //   if (selectedPhoto) {
  //     console.log("Selected file:", selectedPhoto);
  //   }
  //   event.preventDefault();
  // }

  const handleFileSelect = (file) => {
    setSelectedPhoto(file);
    console.log("Selected file:", file);
    // Perform any other logic with the selected file
  };

  console.log(selectedPhoto);
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-photo">
          <img
            src={
              selectedPhoto
                ? URL.createObjectURL(selectedPhoto)
                : "https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
            }
            alt=""
            className="profile-img"
          />
          <PhotoUploader onFileSelect={handleFileSelect} />
        </div>
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
