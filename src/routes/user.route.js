import express from "express";
import userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth";
import UserModel from "../models/user.model";

const router = express.Router();

const verifyUser = [isAuthenticated];

router.get("/info", verifyUser, userController.getUserInfo);

router.post("/", async (req, res) => {
  const user = new UserModel({
    username: "hehe",
    email: "abc@gmail.com",
    providers: [
      {
        providerId: "google",
        providerName: "sfdsf",
      },
    ],
  });

  await user.save();
  return res.json(user);
});

router.patch("/update", verifyUser, userController.updateUserInfo);

router.patch("/block/:userId", verifyUser, userController.blockUser);

export default router;
