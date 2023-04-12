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

    let result = await jwtHepler.verifyToken(token);
    if (!result.success) {
      return res.status(401).json(result);
    }
    req.username = result.decoded.username || "";

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { isAuthenticated };
