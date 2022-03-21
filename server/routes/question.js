const User = require("../db/schema/user")
const Question = require("../db/schema/question")
const express = require("express")
const router = express.Router()
const jwt = require("../utils/jwt")

router.post("/new", async (req, res) => {
  const token = req.cookies["token"]
  try {
    const { uid, role } = jwt.verify(token)
    const { title, bodyHtml, public } = req.body
    let u = await User.findById(uid)
    if (u) {
      if (role != "interviewer") {
        console.error("Error: unauthorized call to question creation.")
        res.status(401).json({ data: null, error: "Not authorized" })
      } else {
        user = await User.findById(uid)
        company = user.company
        const q = await Question.create({
          author: uid,
          title,
          bodyHtml,
          public,
          company,
        })
        await User.updateOne({ _id: uid }, { $push: { questions: q } })
        res.status(200).json({ data: q, error: null })
      }
    } else {
      console.error(e)
      res.status(400).json({ data: null, error: "User not found" })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

router.post("/edit", (req, res) => {
  //
})

router.get("/view/:qid", async (req, res) => {
  try {
    let token = req.cookies["token"]
    const { uid, role } = jwt.verify(token)
    let q = await Question.findById(req.params.qid)
    console.log("qid: ", req.params.qid, q)
    if (!q) {
      res.status(400).json({ data: null, error: "Question not found" })
      return
    }
    if (q.author == uid || q.public) {
      res.status(200).json({ data: q, error: null })
    } else {
      res.status(401).json({ data: null, error: "Not authorized" })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

module.exports = router
