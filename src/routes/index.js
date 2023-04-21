import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import notificationRouter from "./notification.route";
import conversationRouter from "./conversation.route";

const routes = express.Router();

function initRoutes(app) {
  routes.use("/users", userRouter);
  routes.use("/notifications", notificationRouter);
  routes.use("/conversations", conversationRouter);
  // routes.use("/auth", authRouter);
  app.use("/auth", authRouter);

  app.use("/api", routes);

  return app;
}

export default initRoutes;
