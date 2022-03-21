const express = require("express")
const router = express.Router()
const jwt = require("../utils/jwt")
const User = require("../db/schema/user")
const Company = require("../db/schema/company")
const ObjectId = require("mongoose").Types.ObjectId
const { createHash, verifyHash } = require("../utils/hash")

router.post("/new", async (req, res) => {
  try {
    let { name, email, password, role, company } = req.body
    console.log(req.body)
    let u = await User.findOne({ email })
    if (u) {
      res.status(400).json({ data: null, error: "User already exists" })
      return
    } else {
      let c = await Company.findOne({ name: company })
      if (c) company = c._id
      else {
        c = await Company.create({ name: company })
        company = c._id
      }
      let newUser = await User.create({
        name,
        email,
        password: await createHash(password),
        role,
        company: ObjectId(company),
      })
      token = jwt.createAccessToken({ uid: newUser._id, role: newUser.role })
      res.cookie("token", token, { sameSite: "lax" })
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
    if (!user) {
      res.status(400).json({ data: null, error: "No User With This Email" })
      return
    }
    if (!verifyHash(password, user.password)) {
      res.status(400).json({ data: null, error: "Wrong Password" })
      return
    }
    token = jwt.createAccessToken({ uid: user._id, role: user.role })
    res.cookie("token", token, { sameSite: "lax" })
    res.status(200).json({
      data: token,
      error: null,
    })
  } catch (e) {
    console.error(e)
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
