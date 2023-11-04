"use client";
import { createSocket, socket } from "@/utils/socket";
import React from "react";

function page({ params }: { params: { id: string } }) {
  React.useEffect(() => {
    if (!socket.connected && !socket.recovered) {
      createSocket(params.id);
      socket.connect();
    }
  }, []);

  const [message, setMessage] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <div>Room ID: {params.id}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={message}
            onChange={handleChange}
            placeholder="Enter your message.."
            className=""
          />
          <button
            type="submit"
            className="bg-blue-600 border border-blue-600 text-white px-6 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
