import { io } from "socket.io-client";

export var socket = io("http://localhost:3001", {
  autoConnect: false,
  query: {
    roomName: "default",
  },
});

export const createSocket = (name: string) => {
  socket.io.opts.query = { roomName: name };
};
