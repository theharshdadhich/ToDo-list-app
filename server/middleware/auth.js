import jwt from 'jsonwebtoken'; // For ES modules
// const jwt = require('jsonwebtoken'); // For CommonJS

const auth = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token && req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = value;
        return cookies;
      }, {});

      token = cookies.accessToken;
    }

    console.log("Extracted Token:", token); 

    if (!token) {
      return res.status(401).json({
        message: "Authentication failed. No token provided.",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Authentication Error:", error.message); // Debug: Log the full error
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
      error: true,
      success: false,
    });
  }
};

export default auth; // For ES modules
// module.exports = auth; // For CommonJS