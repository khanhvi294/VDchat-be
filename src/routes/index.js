import express from "express";
import userRouter from "./user.route";

const routes = express.Router();

function initRoutes(app) {
  routes.use("/user", userRouter);

  app.use("/api", routes);

  return app;
}

export default initRoutes;
