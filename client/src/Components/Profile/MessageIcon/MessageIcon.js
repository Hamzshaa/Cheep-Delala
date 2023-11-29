import React from "react";
import "./MessageIcon.css";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

function MessageIcon() {
  return (
    <div className="message-icon-wrapper">
      <Link to="/messages">
        <FiMessageSquare className="message-icon" />
      </Link>
    </div>
  );
}

export default MessageIcon;
