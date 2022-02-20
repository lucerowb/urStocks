const mongoose = require("mongoose");

const stockScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    stock_name: {
      type: String,
      required: [true, "Stock name is required"],
    },
    txn_type: {
      type: String,
      enum: ["buy", "sell"],
      required: [true, "Transaction type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    txn_date: {
      type: Date,
      required: [true, "Transaction date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockScheme);
