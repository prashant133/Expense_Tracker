const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const User = require("../models/userModel");
const passport = require("passport");
const asyncHanlder = require("../utils/ayncHandler");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// genreate Accesstoken and refresh token
// 🔐 Generate Access and Refresh Token
const generateAccessTokenAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// 🔹 Redirect to Google login
const googleAuth = (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

// 🔹 Google OAuth callback
const googleCallback = asyncHanlder(async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }
   
    // Fetch Mongoose instance
    const user = await User.findById(req.user._id);
    if (!req.user) throw new ApiError(401, "User not authenticated");

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(req.user._id);

    res
      .status(200)
      .json(
        new ApiResponse(200, { accessToken, refreshToken }, "Login successful")
      );
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    const errorMessage = err?.message || "Internal server error";
    next(new ApiError(500, "Google login failed", [errorMessage]));
  }
});

// 🔄 Handle refresh token
const refreshAccessToken = asyncHanlder(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ userId: decoded.userId });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const newAccessToken = user.generateAccessToken();
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token invalid or expired" });
  }
});

module.exports = {
  googleAuth,
  googleCallback,
  refreshAccessToken,
};
