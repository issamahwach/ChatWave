import React from "react";

interface MessageProps {
  issuer: boolean;
  content: string;
}

function Message({ issuer, content }: MessageProps) {
  return (
    <div
      className={`px-4 py-2 max-w-3xl ${
        issuer ? "bg-[#D3EECA] self-end" : "bg-[#F9F5F5] self-start"
      } max-w-max mb-8`}
    >
      <p>
        {content} - Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Repudiandae placeat voluptatum iure, consectetur, fugit ipsam adipisci
        laborum harum itaque aliquam minus quo eius facere officia ab quidem
        labore tempore. Voluptatum?
      </p>
    </div>
  );
}

export default Message;
