const express = require("express")
const CONSTANTS = require("../constants")
const router = express.Router()

router.post("/", (req, res) => {
  // request body destructured
  const {
    language, // specifies programming language, doubles as file extension for storage/code.xyz file
    input, // user's input string to be stored in storage/input
    code, // user's code string to be stored in storage/code.xyz
  } = req.body

  const uid = "" // TODO: get key from user jwt and mongodb query
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
          pythonHandler(uid, USERSTORAGEPATH)
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
          cppHandler(uid, USERSTORAGEPATH)
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
          jsHandler(uid, USERSTORAGEPATH)
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
})

module.exports = router
