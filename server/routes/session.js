const User = require("../db/schema/user")
const Question = require("../db/schema/question")
const Session = require("../db/schema/session")
const express = require("express")
const router = express.Router()
const jwt = require("../utils/jwt")
const { nanoid } = require("nanoid")

router.post("/new", async (req, res) => {
  const token = req.cookies["token"]
  try {
    const { uid, role } = jwt.verify(token)
    const { candidateEmail } = req.body
    let u = await User.findById(uid)
    if (u) {
      if (role != "interviewer") {
        console.error("Error: unauthorized call to session creation.")
        res.status(401).json({ data: null, error: "Not authorized" })
      } else {
        candidate = await User.findOne({ email: candidateEmail })
        const session = await Session.create({
          interviewer: uid,
          candidate: candidate._id,
          sessionName: "cv-session-" + nanoid(8),
        })
        res.status(200).json({ data: session, error: null })
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

router.post("/end", async (req, res) => {
  const token = req.cookies["token"]
  try {
    const { uid, role } = jwt.verify(token)
    const { sessionName } = req.body
    let u = await User.findById(uid)
    if (u) {
      if (role != "interviewer") {
        console.error("Error: unauthorized call to session conclusion.")
        res.status(401).json({ data: null, error: "Not authorized" })
      } else {
        candidate = await Session.findOneAndRemove({ sessionName })
        res.status(200).json({ data: "Session ended successfuly", error: null })
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

module.exports = router
