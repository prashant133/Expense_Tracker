const express = require("express");
const passport = require("passport");
const {
  googleAuth,
  googleCallback,
  refreshAccessToken,
} = require("../controllers/authController");

const router = express.Router();

router.get("/google", googleAuth);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback
);

router.post("/refresh", refreshAccessToken);

module.exports = router;
