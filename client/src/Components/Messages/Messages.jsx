import React, { useState } from "react";
import "./Message.css";
import SendIcon from "@mui/icons-material/Send";
import MsgCard from "./MsgCard/MsgCard";
import MessageList from "./MessageList/MessageList";

function Messages() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedMsg, setSelectedMsg] = useState("");

  const temporaryUsers = [
    {
      name: "Abebe Abamecha",
      password: "",
      phoneNumber: "",
      email: "",
      additionalInfo: {
        pictureUrl: "https://picsum.photos/200",
        bio: "",
        username: "abeabamecha",
        location: "",
      },
    },
  ];

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
  function handleMsgSelect(name, message) {
    setSelectedMsg(name);
    setMessages(message);
    console.log("message selected", message);
  }

  // const element = document.getElementById("msg-panel");
  // element.scrollTop = element.scrollHeight;
  console.log("Messages.jsx", messages);
  return (
    <>
      <div className="message-page">
        <div className="message-list">
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
            user={temporaryUsers[0]}
          />
          <MessageList
            name="Abdi Ahmed"
            message="Abdi Ahmed, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/300"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hawas Muhaba"
            message="Ante Muhaba, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/400"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Baslii Man"
            message="Lemn gn lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/100"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
          <MessageList
            name="Hamza Jhad"
            message="Hamza Jhad, lorem ipsum ipsum lorem ipsum"
            imgUrl="https://picsum.photos/200"
            onSelect={handleMsgSelect}
          />
        </div>
        {selectedMsg === "" ? (
          <div className="msg-unselected">
            <div>
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        ) : (
          <div className="message-page-container">
            <div className="message-profile-name">
              <h1 className="profile-name">Abdi Ahmed</h1>
              <p className="profile-username">
                abdishaa<span>@cheepDelala</span>
              </p>
            </div>
            <div className="messages">
              <div className="message-chat-panel">
                <div className="msg">
                  {/* <MsgCard message="Hello Abdi Ahmed, lorem ipsum ipusm"isRight={true} />
                  <MsgCard message="Hello Hawas Muhaba, Lorem ipsum ipsum ipusm lorem ipsum?"isRight={false} />
                  <MsgCard message="yeah, you are right. lorem ipsum ipsum lorem ipsum"isRight={true} /> */}
                  {messages.message?.map((message, index) => {
                    console.log(message.text);
                    return (
                      <MsgCard
                        message={message.text}
                        isRight={message.direction === "sent"}
                        time={message.time}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="message-chat-text-area">
                <form>
                  <textarea
                    id="msg-panel"
                    placeholder="Type something..."
                    value={msg}
                    // row="1"
                    onChange={handleChange}
                  ></textarea>
                  <button type="submit" onClick={handleClick}>
                    <SendIcon />
                    send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
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
