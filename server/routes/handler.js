const auth = require("./auth")
const code = require("./code")
const public = require("./public")
const question = require("./question")

module.exports = (app) => {
  app.use("/auth", auth)
  app.use("/code", code)
  app.use("/question", question)
  app.use("/", public)
}
