import express from "express";
import passport from "passport";
const router = express.Router();
import "../services/passport.service";
import authController from "../controllers/auth.controller";
import dotenv from "dotenv";
dotenv.config();

const REACT_APP_CLIENT_URI = process.env.REACT_APP_CLIENT_URI;
const REACT_APP_CLIENT_URI_ERROR = process.env.REACT_APP_CLIENT_URI_ERROR;

router.get("/test", (req, res) => {
  console.log("req ", req.user, req.isAuthenticated());
  return res.json(req.user);
});

// router.get("/success", authController.authSuccess);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/auth/success",
    failureRedirect: REACT_APP_CLIENT_URI_ERROR,
  }),
  function (req, res) {
    res.redirect(`${REACT_APP_CLIENT_URI}?accessToken=${req.user.accessToken}`);
  }
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    // successRedirect: "/auth/success",
    failureRedirect: REACT_APP_CLIENT_URI_ERROR,
  }),
  function (req, res) {
    res.redirect(`${REACT_APP_CLIENT_URI}?accessToken=${req.user.accessToken}`);
  }
);

export default router;
