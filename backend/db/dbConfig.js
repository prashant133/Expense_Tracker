const mongoose = require("mongoose");

const DBNAME = "expenxe_tracker"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DBNAME}`
    );

    console.log(`MongoDB connected ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to mongo db. ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
