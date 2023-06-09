import express from "express";
import conversationController from "../controllers/conversation.controller";
import { isAuthenticated } from "../middlewares/auth";

const verifyUser = [isAuthenticated];

const router = express.Router();

router.post("/", verifyUser, conversationController.createConversation);
router.patch(
  "/group/out/:groupId",
  verifyUser,
  conversationController.outGroupChat
);
router.get("/", verifyUser, conversationController.getConversations);
router.patch(
  "/group/update/:groupId",
  verifyUser,
  conversationController.updateGroupChat
);
router.patch(
  "/group/addmember",
  verifyUser,
  conversationController.addMemberToGroupChat
);
router.patch(
  "/group/removemember",
  verifyUser,
  conversationController.removeMemberFromGroupChat
);

export default router;
