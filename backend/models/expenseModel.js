const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "NPR",
    },
    vendor: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
