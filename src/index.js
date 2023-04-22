import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db";
const session = require("express-session");
import { createServer } from "http";

import passport from "passport";
import initRoutes from "./routes";
import sockerServer, { initSocket } from "./configs/socket";

import { Server } from "socket.io";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.REACT_APP_CLIENT_URI,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(
  session({
    key: "process.env.SESSION_KEY",
    secret: "process.env.SESSION_SECRET",
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 1000 * 60 * 60 * 24, //86400000 seconds = 1 day
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
connectDB();

const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.REACT_APP_CLIENT_URI,
//     credentials: true,
//   },
// });

initSocket(httpServer);
sockerServer();

initRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

// app.listen(port, () => {
//   console.log(`App is listening on port ${port}`);
// });
