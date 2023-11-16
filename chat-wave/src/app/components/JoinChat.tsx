"use client";
import React from "react";
import { useRouter } from "next/navigation";

function JoinChat() {
  const router = useRouter();
  const [name, setName] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/rooms/${name}`);
  };
  return (
    <div>
      <div className="py-8 flex flex-row justify-center items-center">
        <div className="w-full border-b border-gray-300"></div>
        <span className="px-4">OR</span>
        <div className="w-full border-b border-gray-300"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-8 md:gap-0"
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter Chat ID"
          className=""
        />
        <button
          type="submit"
          className="bg-blue-600 border border-blue-600 text-white px-6 py-2"
        >
          Join Existing Chat
        </button>
      </form>
    </div>
  );
}

export default JoinChat;
