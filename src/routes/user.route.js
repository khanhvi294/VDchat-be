import express from "express";
import UserModel from "../models/user.model";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("first");
});

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

export default router;
