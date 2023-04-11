import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
dotenv.config();
import initRoutes from "./routes";
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
connectDB();

initRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
