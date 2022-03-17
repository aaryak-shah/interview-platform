const mongoose = require("mongoose")

const SessionSchema = new mongoose.Schema(
  {
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    sessionName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Sessions", SessionSchema)
