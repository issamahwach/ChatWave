"use client";
import React from "react";
import { socket, createSocket } from "../../utils/socket";
import { useRouter } from "next/navigation";

function CreateChat() {
  const router = useRouter();
  const [name, setName] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    createSocket(name);
    socket.connect();
    router.push(`/rooms/${name}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name.."
        className=""
      />
      <button
        type="submit"
        className="bg-blue-600 border border-blue-600 text-white px-6 py-2"
      >
        Start New Chat
      </button>
    </form>
  );
}

export default CreateChat;
