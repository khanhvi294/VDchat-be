import { connect } from "mongoose";

async function connectDB() {
  const dbURL = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
  try {
    await connect(dbURL);
    console.log("Connected to DB Successfully !!!");
  } catch (error) {
    console.log(error);
  }
}

export { connectDB };
