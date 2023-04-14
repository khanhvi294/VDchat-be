import jwtUtil from "../utils/jwt";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
        errToken: true,
      });
    }

    let result = await jwtUtil.verifyToken(token);
    if (!result.success) {
      return res.status(401).json(result);
    }
    req.userData = result.decoded || "";

    next();
  } catch (err) {
    console.log("err auth ", err);
    return res.status(500).json(err);
  }
};

export { isAuthenticated };
