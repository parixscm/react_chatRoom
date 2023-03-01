import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    return;
  };

  return (
    <div className="App">
      <h3>Join a Chat</h3>
      <input
        type="text"
        value={username}
        placeholder="John..."
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={room}
        placeholder="Room ID"
        onChange={e => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default App;
