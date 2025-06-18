const mongoose = require("mongoose");

const EmailLogSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subject: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    isParsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EmailLog = mongoose.model("EmailLog", EmailLogSchema);
module.exports = EmailLog;
