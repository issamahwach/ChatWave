import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
dotenv.config();
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: CLIENT_ORIGIN,
        methods: ["GET", "POST"],
    },
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var currentRooms = [{ room: "defaut", count: 0, users: [] }];
var connectedUsers = [];
app.get("*", (req, res) => {
    res.send("REST API is currenctly disabled.");
});
io.on("connection", (socket) => {
    console.log("New user connected with socket id: ", socket.id);
    connectedUsers.push(socket.id);
    console.log("connected users: ", connectedUsers);
    var socketQuery = socket.handshake.query;
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
        let content = JSON.parse(message);
        console.log("Received: ", content.message);
        io.to(socketQuery.roomName).emit("message", content);
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
                console.log("Removing from room...");
                selectedRoom.count -= 1;
                const userIndex = selectedRoom.users.indexOf(socket.id);
                selectedRoom.users.splice(userIndex, 1);
            }
            else {
                console.log(`Room ${selectedRoom.room} is left empty, deleting the room..`);
                const roomIndex = currentRooms.indexOf(selectedRoom);
                currentRooms.splice(roomIndex, 1);
            }
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map