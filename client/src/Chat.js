import { useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        writer: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };

  return (
    <div>
      {/* Chat header */}
      <div>
        <p>Live Chat</p>
      </div>

      {/* Chat body */}

      {/* Chat footer */}
      <div>
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={e => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
