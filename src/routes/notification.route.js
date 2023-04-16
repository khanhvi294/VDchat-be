import express from "express";
import notificationController from "../controllers/notification.controller";
import { isAuthenticated } from "../middlewares/auth";

const verifyUser = [isAuthenticated];

const router = express.Router();

router.post("/", verifyUser, notificationController.createNotification);

export default router;
