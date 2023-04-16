import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import notificationRouter from "./notification.route";

const routes = express.Router();

function initRoutes(app) {
  routes.use("/user", userRouter);
  routes.use("/notification", notificationRouter);
  // routes.use("/auth", authRouter);
  app.use("/auth", authRouter);

  app.use("/api", routes);

  return app;
}

export default initRoutes;
