"use client";
import { socket } from "../../utils/socket";
import React from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../global/alert/messageSlice";
import { updateParticipants } from "../../global/alert/participantSlice";
function ConnectionStatus() {
  const dispatch = useDispatch();
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

    function onMessage(data: any) {
      console.log(data);
      dispatch(addMessage(data));
    }
    function onJoin(data: string) {
      // alert("someone joined the chat");
      console.log(data);
      dispatch(updateParticipants(data));
    }
    function onLeave(data: string) {
      // alert("someone joined the chat");
      console.log(data);
      dispatch(updateParticipants(data));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("join", onJoin);
    socket.on("leave", onLeave);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("join", onJoin);
      socket.off("leave", onLeave);
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
