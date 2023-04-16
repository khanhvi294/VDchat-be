import express from "express";
import MessageModel from "../models/message.model";
const router = express.Router();

router.post("/", async (req, res) => {
  const message = new MessageModel({});
});
