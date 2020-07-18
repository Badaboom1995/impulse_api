const mongoose = require("mongoose");
const ChallengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    skip: {
      type: ["Mixed"]
    },
    action: {
      name: {
        type: "String"
      },
      description: {
        type: "String"
      },
      time: {
        type: "String"
      }
    },
    state: {
      type: ["Mixed"]
    }
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;
