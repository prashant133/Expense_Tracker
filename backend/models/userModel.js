const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
    accessToken: {
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
