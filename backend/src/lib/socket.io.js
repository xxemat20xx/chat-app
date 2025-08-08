import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Notify all clients about online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for sendMessage from client
    socket.on("sendMessage", ({ receiverId, message }) => {
        const receiverSocketId = getReceiverSocketId(receiverId);

        // Emit to receiver if online
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }

        // Also emit back to sender for instant UI update
        io.to(socket.id).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId) {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
