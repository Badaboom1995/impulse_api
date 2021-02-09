const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    habits: {
      type: ["Mixed"],
    },
    practices: {
      type: ["String"],
    },
    courses: {
      type: ["String"],
    },
    goals: {
      type: ["String"],
    },
    time: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
