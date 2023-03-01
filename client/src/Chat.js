import { useState, useEffect } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

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
      setMessageList(list => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", data => {
      setMessageList(prev => [...prev, data]);
    });
  }, [socket]);

  return (
    <div className="mx-auto w-[300px] h-[420px]">
      <div className="relative w-full h-[45px] bg-gray-200 cursor-pointer">
        <p className="px-1 py-0 block font-bold">Live Chat</p>
      </div>
      <div>
        {messageList.map(messageContent => {
          return (
            <div
              className={
                username === messageContent.writer
                  ? "bg-red-200"
                  : "bg-blue-200"
              }
            >
              <div>
                <div>
                  <p className="text-lg">{messageContent.message}</p>
                </div>
                <div className="flex space-x-4">
                  <p className="text-sm">{messageContent.time}</p>
                  <p className="text-sm font-bold">{messageContent.writer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex h-[40px] border-[1px] border-t-0 border-[#263238]">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={e => setCurrentMessage(e.target.value)}
          onKeyDown={e => {
            e.key === "Enter" && sendMessage();
          }}
          className="px-2 py-0 flex-1 h-full border-0 border-r-[1px] border-r-[#607d8b] outline-none"
        />
        <button
          onClick={sendMessage}
          className="h-full p-2 grid place-items-center border-0 cursor-pointer bg-transparent outline-none text-xl text-gray-200 hover:text-[#43a047]"
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
