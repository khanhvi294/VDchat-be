import express from "express";
import conversationController from "../controllers/conversation.controller";
import { isAuthenticated } from "../middlewares/auth";

const verifyUser = [isAuthenticated];

const router = express.Router();

router.post("/", verifyUser, conversationController.createConversation);
router.post("/group", verifyUser, conversationController.createGroupChat);
router.post("/group/out", verifyUser, conversationController.createGroupChat);
router.get("/", verifyUser, conversationController.getConversations);

export default router;
