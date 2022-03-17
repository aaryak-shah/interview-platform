const auth = require("./auth")
const code = require("./code")
const public = require("./public")
const question = require("./question")
const profile = require("./profile")
const session = require("./session")

module.exports = (app) => {
  app.use("/auth", auth)
  app.use("/code", code)
  app.use("/question", question)
  app.use("/profile", profile)
  app.use("/session", session)
  app.use("/", public)
}
