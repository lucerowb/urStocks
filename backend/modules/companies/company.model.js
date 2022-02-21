const mongoose = require("mongoose");

const companyScheme = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    company_name: {
      type: String,
      required: [true, "Company name is required"],
      unique: true,
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      unique: true,
    },
    available_quantity: {
      type: Number,
      required: [true, "Available quantity is required"],
    },
    prev_amount: {
      type: Number,
      required: [true, "Previous amount is required"],
    },
    current_amount: {
      type: Number,
      required: [true, "Current amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companyScheme);
