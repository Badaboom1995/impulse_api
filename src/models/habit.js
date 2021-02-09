const mongoose = require("mongoose");
const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    practiceId: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      required: false,
    },
    repeat: {
      type: ["String"],
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    state: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
