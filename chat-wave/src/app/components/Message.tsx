import React from "react";

interface MessageProps {
  issuer: boolean;
  content: string;
  messageTime: string;
}

function Message({ issuer, content, messageTime }: MessageProps) {
  return (
    <div
      className={`relative px-4 py-1.5 max-w-3xl rounded-sm ${
        issuer ? "bg-[#D3EECA] self-end" : "bg-[#F9F5F5] self-start"
      } max-w-max mb-8`}
    >
      <p className="pb-3">{content}</p>
      <span className="absolute bottom-1 right-1 text-xs text-gray-500">
        {messageTime}
      </span>
    </div>
  );
}

export default Message;
