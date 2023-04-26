import express from "express";
import messageController from "../controllers/message.controller";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

const verifyUser = [isAuthenticated];
router.get("/:conversationId", verifyUser, messageController.getMessages);
router.post("/", verifyUser, messageController.createMessage);
router.patch("/delete", verifyUser, messageController.deleteMessage);
export default router;
