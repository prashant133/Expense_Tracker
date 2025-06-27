const app = require("./app");
const connectDB = require("./db/dbConfig");
const dotenv = require("dotenv").config();



connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(`mongo DB Connection failed !!! ${error}`);
  });
