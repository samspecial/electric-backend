const jwt = require("jsonwebtoken");

require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

exports.authenticateJWT = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) return res.status(401).json({ error: "Invalid authentication" });
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // check if decoded
    if (!decoded) return res.status(401).json({ error: "Authorization denied" });
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.authCheck = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
};
