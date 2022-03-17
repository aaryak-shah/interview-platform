const Question = require("../db/schema/question")
const express = require("express")
const router = express.Router()

router.get("/questions", async (req, res) => {
  try {
    questions = await Question.find({ public: true })
    res.status(200).json({ data: questions, error: null })
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

router.get("/companies", (req, res) => {
  // TODO: get company list
})

module.exports = router
