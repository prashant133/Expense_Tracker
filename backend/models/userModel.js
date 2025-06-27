const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    lastSyncedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// generating access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this.userId,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// generating referesh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      userId: this.userId,
      email: this.email,
      name: this.name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
