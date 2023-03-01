import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
    return;
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="flex flex-col items-center text-center">
          <h3 className="text-4xl mt-48 mb-4">Join a Chat</h3>
          <input
            type="text"
            value={username}
            placeholder="John..."
            onChange={e => setUsername(e.target.value)}
            className="m-2 p-1 w-[210px] h-[40px] border-2 border-[#43a047] rounded-md text-lg"
          />
          <input
            type="text"
            value={room}
            placeholder="Room ID"
            onChange={e => setRoom(e.target.value)}
            className="m-2 p-1 w-[210px] h-[40px] border-2 border-[#43a047] rounded-md text-lg"
          />
          <button
            onClick={joinRoom}
            className="m-2 p-1 w-56 h-12 bg-[#43a047] rounded-md text-lg cursor-pointer hover:bg-[#2e7d32]"
          >
            Join
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
