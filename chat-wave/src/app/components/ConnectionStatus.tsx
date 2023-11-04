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
    <div>
      ConnectionStatus:{" "}
      {isConnected ? <span>Online</span> : <span>Offline</span>}
    </div>
  );
}

export default ConnectionStatus;
