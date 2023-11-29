import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { FaHouseChimney } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import ProfileAndName from "./ProfileAndName/ProfileAndName";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

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
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          {/* <li className="navbar-toggle">
              <Link className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li> */}
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
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
