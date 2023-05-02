import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

let io = {};

let users = [];

const handleJoin = (data) => {
  users.push(data);
};

const handleLeave = (data) => {};

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.REACT_APP_CLIENT_URI,
      credentials: true,
    },
  });
};

const sockerServer = () => {
  io.on("connection", (socket) => {
    // console.log("socet init ", socket.id);

    socket.on("join", (userId) => {
      if (userId) {
        handleJoin({
          userId,
          socketId: socket.id,
        });
      }
    });

    socket.on("join-conversations", (conversationIds) => {
      conversationIds.forEach((id) => socket.join(id));
    });

    socket.on("join-conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leave-conversation", (conversationId) => {
      socket.leave(conversationId);
    });
  });
};

export { io, initSocket };

export default sockerServer;
