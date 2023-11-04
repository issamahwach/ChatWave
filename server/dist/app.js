import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import http from "http";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var currentRooms = [{ room: "defaut", count: 0, users: [] }];
var connectedUsers = [];
app.get("/", (req, res) => {
    res.send("Hello!");
});
io.on("connection", (socket) => {
    console.log("New user connected!");
    console.log("socket id: ", socket.id);
    connectedUsers.push(socket.id);
    console.log("connected users: ", connectedUsers);
    let socketQuery = socket.handshake.query;
    if (socketQuery && socketQuery.roomName !== "default") {
        const existingRoom = currentRooms.find((exRoom) => exRoom.room === socketQuery.roomName);
        if (!existingRoom) {
            currentRooms.push({
                room: socketQuery.roomName,
                count: 1,
                users: [{ socket: socket.id }],
            });
            socket.join(socketQuery.roomName);
        }
        else {
            socket.join(socketQuery.roomName);
            currentRooms.forEach((room) => {
                if (room.room === socketQuery.roomName) {
                    room.count += 1;
                    room.users.push({ socket: socket.id });
                }
            });
        }
        console.log(currentRooms);
    }
    // Listen for incoming messages
    socket.on("message", (message) => {
        // Broadcast the message to all connected users
        console.log("Received: " + message);
        // io.to(socketQuery.roomName).emit("message", message);
    });
    // Disconnect the user when they leave
    socket.on("disconnect", () => {
        console.log("User disconnected");
        const index = connectedUsers.indexOf(socket.id);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
        console.log(connectedUsers);
        var selectedRoom = currentRooms.find((e) => e.room === socket.handshake.query.roomName);
        if (selectedRoom) {
            if (selectedRoom.count > 1) {
                console.log("deducting from room");
                selectedRoom.count -= 1;
                const userIndex = selectedRoom.users.indexOf(socket.id);
                selectedRoom.users.splice(userIndex, 1);
            }
            else {
                console.log("room is empty, deleting room..");
                const roomIndex = currentRooms.indexOf(selectedRoom);
                currentRooms.splice(roomIndex, 1);
            }
        }
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map