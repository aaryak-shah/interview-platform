const express = require("express")
const cors = require("cors")
const socketio = require("socket.io")
const mongoConnection = require("./db/conn")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const CONSTANTS = require("./constants.js")
const PORT = CONSTANTS.PORT

// socket.io
const socket = require("./socket")

// global variables initialised
const app = express()
const server = require("http").createServer(app)

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser(global.cookieSecret))
app.use(cors())

mongoConnection()
  .then((mongoDefaultConnection) => {
    console.log(
      global.color.green,
      "Successfully connected to mongoDB server",
      global.color.reset
    )
    global.mongoDefaultConnection = mongoDefaultConnection
  })
  .catch(() => {
    console.error(
      global.color.red,
      "Failed to connect mongoDB server",
      global.color.reset
    )
    console.log(
      global.color.yellow,
      "Stopping the server...",
      global.color.reset
    )
    process.exit(0)
  })

require("./routes/handler")(app)

app.get("*", (req, res) => {
  res.status(404).send("Route not found")
})

socket.initializer(socketio, server)

// server listening on PORT
server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
