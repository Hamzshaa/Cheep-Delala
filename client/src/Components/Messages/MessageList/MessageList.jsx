import React, { useEffect, useState } from "react";
import "./MessageList.css";
import axios from "axios";

function MessageList(props) {
  const [msg, setMsg] = useState({});
  const sender = "Abebe Abamecha";
  const receiver = "Abdi Ahmed";

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(
        `http://localhost:8080/messages/${sender}/${receiver}`
      );

      setMsg(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  // console.log("message list: ", props.user?.name);

  return (
    <div
      className="message-list-card"
      onClick={() => props.onSelect(props.name, msg)}
    >
      <img
        alt=""
        src={props.user?.additionalInfo?.pictureUrl || props.imgUrl}
      />
      <div>
        <h2>{props.user?.name}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

export default MessageList;
