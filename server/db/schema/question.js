const mongoose = require("mongoose")

const QuestionsSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    title: {
      type: String,
      required: true,
    },
    bodyHtml: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: false,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies",
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Questions", QuestionsSchema)
