import dotenv from "dotenv";
dotenv.config();
import authService from "../services/auth.service";

const authSuccess = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      let result = await authService.authSuccess(req.user);
      res.status(200).json(result);
    } else {
      throw new Error("Authentication failed !!!");
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

const authFailed = (req, res) => {
  res.status(401).json({ message: "fucked" });
};

export { authSuccess };

const authController = {
  authSuccess,
  authFailed,
};

export default authController;
