const express = require("express")
const CONSTANTS = require("../constants")
const User = require("../db/schema/user")
const router = express.Router()
const jwt = require("../utils/jwt")
const fs = require("fs")
const pythonHandler = require("../languages/python")
const cppHandler = require("../languages/cpp")
const jsHandler = require("../languages/javascript")

router.post("/", async (req, res) => {
  try {
    // request body destructured
    const {
      language, // specifies programming language, doubles as file extension for storage/code.xyz file
      input, // user's input string to be stored in storage/input
      code, // user's code string to be stored in storage/code.xyz
    } = req.body

    const token = req.cookies["token"]
    const { uid, role } = jwt.verify(token)
    try {
      await User.findById(uid)
    } catch (e) {
      console.error(e)
      res.status(400).json({ data: null, error: "User does not exist" })
    }
    const userFilePath = CONSTANTS.USERSTORAGEPATH + uid

    // storage for input
    fs.writeFile(userFilePath, input, (inpFileErr) => {
      if (inpFileErr) {
        res.send({ stderr: `input err ${inpFileErr}` })
        return
      }

      // storage for user's program
      fs.writeFile(userFilePath + "." + language, code, async (codeFileErr) => {
        if (codeFileErr) {
          res.send({ stderr: `code err ${codeFileErr}` })
          return
        }

        // switching logic to call language specific handler
        switch (language) {
          // python
          case "py": {
            pythonHandler(uid, CONSTANTS.USERSTORAGEPATH)
              .then((result) => {
                const { stdout, stderr, code, signal } = result
                const err_send = stderr || signal || code
                if (err_send) {
                  res.send({ output: err_send, verdict: "error" })
                }
                res.send({ output: stdout, verdict: "success" })
              }) // callback responds result of successful execution
              .catch((err) => res.send(err)) // callback responds result of failed execution
            break
          }

          // c++
          case "cpp": {
            cppHandler(uid, CONSTANTS.USERSTORAGEPATH)
              .then((result) => {
                const { stdout, stderr, code, signal } = result
                const err_send = stderr || signal || code
                if (err_send) {
                  res.send({ output: err_send, verdict: "error" })
                }
                res.send({ output: stdout, verdict: "success" })
              }) // callback responds result of successful execution
              .catch((err) => {
                res.send(err)
              }) // callback responds result of failed execution
            break
          }

          // node.js
          case "js": {
            jsHandler(uid, CONSTANTS.USERSTORAGEPATH)
              .then((result) => {
                const { stdout, stderr, code, signal } = result
                const err_send = stderr || signal || code
                if (err_send) {
                  res.send({ output: err_send, verdict: "error" })
                }
                res.send({ output: stdout, verdict: "success" })
              }) // callback responds result of successful execution
              .catch((err) => res.send(err)) // callback responds result of failed execution
            // break
          }
        }
      })
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ data: null, error: "Internal server error" })
  }
})

module.exports = router
