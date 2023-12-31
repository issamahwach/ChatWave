"use client";
import Message from "@/app/components/Message";
import Participant from "@/app/components/Participant";
import { createSocket, socket } from "@/utils/socket";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function page({ params }: { params: { id: string } }) {
  const newMessage = useSelector((state: any) => state.message.message);
  const participants = useSelector(
    (state: any) => state.participant.participants
  );

  React.useEffect(() => {
    if (!socket.connected && !socket.recovered) {
      createSocket(params.id);
      socket.connect();
    }
  }, []);

  React.useEffect(() => {
    if (newMessage && newMessage !== "") {
      setChat((prevValue) => [...prevValue, newMessage]);
    }
  }, [newMessage]);

  React.useEffect(() => {
    if (participants && participants.length !== 0) {
      setParticipantsList(participants);
    }
  }, [participants]);

  const [participantsList, setParticipantsList] = React.useState<
    ParticipantProps[]
  >([]);
  const [message, setMessage] = React.useState<string>("");
  const [chat, setChat] = React.useState<MessageProps[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message && message !== "") {
      socket.emit(
        "message",
        JSON.stringify({ message: message, issuer: socket.id })
      );
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="hidden lg:flex flex-col w-full lg:w-1/4 h-screen border-r">
        <div className="relative bg-[#008069] h-32 w-full">
          <div className="absolute bottom-2 left-2">
            <button className="flex flex-row items-center gap-4 text-white px-6 py-2">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg">Back</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col divide-y-2">
          {participantsList &&
            participantsList.map((item, index) => (
              <Participant key={"P" + index} socket={item.socket} />
            ))}
        </div>
      </div>
      <div className="relative w-full lg:w-3/4 h-screen overflow-hidden">
        <div className="bg-[#F0EEF1] py-4 px-4 lg:px-8 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4">
            <div className="px-1.5 py-1.5 bg-blue-400 rounded-full max-w-max">
              <svg
                className="w-8 h-8 text-white"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg"> {params.id} </span>
              <span className="text-xs">online</span>
            </div>
          </div>
          <Link href="/">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className="min-h-full max-h-[10vh] flex flex-col overflow-y-scroll px-4 lg:px-10 pt-8 pb-52 bg-[#F0E7E0]">
          <span className="text-xs self-center bg-[#F9F5F5] text-gray-700 px-2 py-1 rounded-sm">
            Your messages are not being stored. Refreshing the page will delete
            all messages.
          </span>
          {chat.map((message, index) => (
            <Message
              issuer={message?.issuer === socket.id ? true : false}
              content={message?.message}
              messageTime={message?.messageTime}
              key={index}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-[#F0EEF1] py-4 px-4 lg:px-8">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full flex flex-row items-center">
                <textarea
                  name="name"
                  rows={1}
                  value={message}
                  onChange={handleChange}
                  onKeyDown={handleEnterKeyPress}
                  placeholder="Type a message.."
                  className="w-full border-0 rounded-md font-light focus:ring-0 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#008069] border border-[#008069] text-white px-6 py-2 h-max"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
