import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./configs/db";
const session = require("express-session");

import passport from "passport";
import initRoutes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.REACT_APP_CLIENT_URI,
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

initRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
