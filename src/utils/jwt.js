import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const tokenLife = process.env.TOKEN_LIFE;
const secret = process.env.TOKEN_SECRET;

let generateToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = await jwt.sign(data, secret, { expiresIn: tokenLife });
      console.log("token", token);
      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

let verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("token verify ", token);
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          console.log("err verify token:", err.message);
          return resolve({
            success: false,
            message: err.message,
            errorName: err.name,
            errToken: true,
          });
        }
        resolve({ decoded, success: true });
      });
    } catch (err) {
      console.log("error", err);
      reject(err);
    }
  });
};

const jwtUtil = { generateToken, verifyToken };

export default jwtUtil;
