const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "candidate",
      required: true,
    },
    company: {
      type: String,
    },
    interviews: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", UserSchema)
