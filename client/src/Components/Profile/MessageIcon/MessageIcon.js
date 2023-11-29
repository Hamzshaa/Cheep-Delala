import React from "react";
import "./MessageIcon.css";
import { FiMessageSquare } from "react-icons/fi";

function MessageIcon() {
  return (
    <div className="message-icon-wrapper">
      <FiMessageSquare className="message-icon" />
    </div>
  );
}

export default MessageIcon;
