import React, { useContext, useState } from "react";
import _ from "lodash";
import * as FaIcons from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import ProfileAndName from "./ProfileAndName/ProfileAndName";
import { LoginStatusContext } from "../../App";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const { loginStatus, loginStatusHandler } = useContext(LoginStatusContext);
  console.log(_.isEqual(loginStatus, {}));

  function handleSignOut() {
    loginStatusHandler({});
  }

  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <>
      <div className="navbar">
        <Link className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Link to="/" className="logo">
          <FaHouseChimney className="logo-img" />
          Cheep Delala
        </Link>

        <div className="nav-sign-up">
          {_.isEqual(loginStatus, {}) ? (
            <Link to="/signup">
              <h5>SIGN UP</h5>
            </Link>
          ) : (
            <Link className="login-status" to="/signup" onClick={handleSignOut}>
              <h5>SIGN OUT</h5>
              <p>{loginStatus.email}</p>
            </Link>
          )}
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link
                  to={
                    item.path === "/"
                      ? "/"
                      : _.isEqual(loginStatus, {})
                      ? "signup"
                      : item.path
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <ProfileAndName />
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
