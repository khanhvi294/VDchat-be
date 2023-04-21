import express from "express";
import messageController from "../controllers/message.controller";
import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

const verifyUser = [isAuthenticated];
router.post("/", verifyUser, messageController.createMessage);
export default router;
