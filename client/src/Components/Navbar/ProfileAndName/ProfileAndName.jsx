import React, { useContext } from "react";
import "./ProfileAndName.css";
import { Link } from "react-router-dom";
import _ from "lodash";
import { LoginStatusContext } from "../../../App";

function ProfileAndName() {
  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);

  return _.isEqual(loginStatus, {}) ? (
    <Link to="/signup" className="sidebar-sign-up">
      <p>SIGN UP</p>
    </Link>
  ) : (
    <div className="miniprofile">
      <Link to="/profile">
        <div className="miniprofile-img">
          <img
            src="https://picsum.photos/100"
            alt=""
            // className="miniprofile-img"
          />
        </div>
      </Link>
      <Link to="/profile">
        <h1>{loginStatus.name}</h1>
      </Link>
      <Link to="/miniprofile">
        <p>{loginStatus.email}</p>
      </Link>
    </div>
  );
}

export default ProfileAndName;
