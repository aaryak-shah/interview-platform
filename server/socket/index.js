const { socketEvents } = require("./socketEvents/index")
const CONSTANTS = require("../constants.js")
const SOCKET = CONSTANTS.SOCKET

module.exports.initializer = (socketio, server) => {
  const io = socketio(server, {
    cors: {
      origin: SOCKET.ORIGIN,
      methods: SOCKET.METHODS,
      credentials: true,
    },
  })

  // socket listens to connection event
  io.on("connection", (client) => {
    socketEvents(client, io)
  })

  return io
}
