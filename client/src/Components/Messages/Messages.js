import React, { useState } from "react";
import "./Message.css";
import SendIcon from "@mui/icons-material/Send";
import MsgCard from "./MsgCard/MsgCard";

function Messages() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  function handleClick(event) {
    if (msg !== "") {
      setMsgs((prevMsg) => {
        return [...prevMsg, msg];
      });

      console.log(msgs);
    }
    setMsg("");
    event.preventDefault();
  }

  function handleChange(event) {
    setMsg(event.target.value);
  }

  // const element = document.getElementById("msg-panel");
  // element.scrollTop = element.scrollHeight;

  return (
    <>
      <div className="message-profile-name">
        <h1 className="profile-name">Abdi Ahmed</h1>
        <p className="profile-username">
          abdishaa<span>@cheepDelala</span>
        </p>
      </div>
      <div className="messages">
        <div className="message-chat-panel">
          <div className="msg">
            <MsgCard
              message="Hello Abdi Ahmed, lorem ipsum ipusm"
              isRight={true}
            />
            <MsgCard
              message="Hello Hawas Muhaba, Lorem ipsum ipsum ipusm lorem ipsum?"
              isRight={false}
            />
            <MsgCard
              message="yeah, you are right. lorem ipsum ipsum lorem ipsum"
              isRight={true}
            />
            {msgs.map((message, index) => {
              return <MsgCard message={message} isRight={index % 2} />;
            })}
          </div>
        </div>
        <div className="message-chat-text-area">
          <form>
            <textarea
              id="msg-panel"
              placeholder="Type something..."
              value={msg}
              row="1"
              onChange={handleChange}
            ></textarea>
            <button type="submit" onClick={handleClick}>
              <SendIcon />
              send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Messages;

{
  /* <h1 className="profile-name">Hawas Muhaba</h1>
      <p className="profile-username">
        Hawasishaa<span>@cheepDelala</span>
      </p> */
}
