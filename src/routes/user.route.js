import express from "express";
import UserModel from "../models/user.model";
import userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth";
import userService from "../services/user.service";

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

router.get("/users", async (req, res) => {
  // const users
});

router.patch("/users/update", userController.updateUserInfo);

export default router;
