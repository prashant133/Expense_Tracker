const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./utils/passport");
const app = express();

// to communicate with frontend for now allow all
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// to allow to communicate with json file and adding limit to the file
app.use(express.json({ limit: "16kb" }));

// to save the static file
app.use(express.static("public"));

// to communicate with cookie
app.use(cookieParser());

// initialize passport
app.use(passport.initialize());

// import routes
const authRouter = require("./routes/authRoutes");

// routes
app.use("/auth/", authRouter);



module.exports = app;
