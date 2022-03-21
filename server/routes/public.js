const Question = require("../db/schema/question")
const express = require("express")
const Company = require("../db/schema/company")
const router = express.Router()

router.get("/questions", async (req, res) => {
  try {
    questions = await Question.find({ public: true }).populate("company")
    res.status(200).json({ data: questions, error: null })
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

router.get("/companies", async (req, res) => {
  try {
    companies = await Company.find({ name: { $ne: "N/A" } })
    res.status(200).json({ data: companies, error: null })
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

module.exports = router
