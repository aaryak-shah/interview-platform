const express = require("express")
const router = express.Router()
const jwt = require("../utils/jwt")
const User = require("../db/schema/user")
const { createHash, verifyHash } = require("../utils/hash")

router.post("/new", async (req, res) => {
  try {
    const { name, email, password, role, company } = req.body
    let u = await User.findOne({ email })
    if (u) {
      res.status(400).json({ data: null, error: "User already exists" })
    } else {
      let newUser = await User.create({
        name,
        email,
        password: await createHash(password),
        role,
        company,
      })
      token = jwt.createAccessToken({ uid: newUser._id, role: newUser.role })
      res.cookie("token", token)
      res.status(200).json({
        data: token,
        error: null,
      })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({
      data: null,
      error: "Internal Server Error",
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (!verifyHash(password, user.password)) {
      res.status(400).json({ data: null, error: "Wrong Password" })
    }
    token = jwt.createAccessToken({ uid: user._id, role: user.role })
    res.cookie("token", token)
    res.status(200).json({
      data: token,
      error: null,
    })
  } catch (e) {
    res.status(500).json({
      data: null,
      error: "Internal Server Error",
    })
  }
})

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token")
    res.status(200).json({ data: "Logged out", error: null })
  } catch (e) {
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

module.exports = router
