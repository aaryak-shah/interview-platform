const Question = require("../db/schema/question")
const User = require("../db/schema/user")
const jwt = require("../utils/jwt")
const express = require("express")
const router = express.Router()

router.get("/questions", async (req, res) => {
  try {
    token = req.cookies["token"]
    const { uid, role } = jwt.verify(token)
    if (await User.findById(uid)) {
      let questions = await Question.find({ author: uid })
      res.status(200).json({ data: questions, error: null })
    } else {
      res.status(401).json({ data: null, error: "Not authorized" })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

router.get("/info", async (req, res) => {
  try {
    token = req.cookies["token"]
    const { uid, role } = jwt.verify(token)
    let user = await User.findById(uid, "-password")
    if (user) {
      res.status(200).json({ data: user, error: null })
    } else {
      res.status(400).json({ data: null, error: "User not found" })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

module.exports = router
