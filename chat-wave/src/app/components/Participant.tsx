import React from "react";

function Participant({ socket }: ParticipantProps) {
  return (
    <div className="px-4 py-4 flex flex-row items-center gap-2">
      <div className="px-1.5 py-1.5 bg-gray-100 rounded-full max-w-max">
        <svg
          className="w-8 h-8 text-gray-300"
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
      <span className="text-sm">{socket}</span>
    </div>
  );
}

export default Participant;
