"use client";
import { socket } from "../../utils/socket";
import React from "react";

function ConnectionStatus() {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    function onConnect() {
      console.log("connecting...");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnecting...");
      setIsConnected(false);
    }

    function onMessage(data: string) {
      console.log(data);
    }
    function onJoin(data: string) {
      console.log(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("join", onJoin);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("onJoin", onJoin);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 text-xs bg-gray-100 px-6 py-2 rounded-full shadow-md">
      {isConnected ? (
        <div className="flex flex-row items-center gap-1">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <span className="text-green-600 font-bold">Online</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-red-500 font-bold">Offline</span>
        </div>
      )}
    </div>
  );
}

export default ConnectionStatus;
