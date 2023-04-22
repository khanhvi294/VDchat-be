import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

// const sockerServer = (io) => {

//   io.on("connection", (socket) => {
//     console.log("socet init ", socket.id);

//     socket.emit("hello", "world");

//     socket.on("hahah", (data) => {
//       console.log("bkcbcbcvb", data);
//     });
//   });
// };

let io = {};

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
    console.log("socet init ", socket.id);

    socket.on("join", (data) => {
      console.log("sfdhshfh", data);
    });

    socket.emit("hello", "world");

    socket.on("hahah", (data) => {
      console.log("bkcbcbcvb", data);
    });
  });
};

export { io, initSocket };

export default sockerServer;
