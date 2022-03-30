module.exports.socketEvents = (client, io) => {
  // when client emits a 'hostSession' event
  client.on("hostSession", (data) => {
    const { sessionCode } = data
    // adds the client's ID to the room
    client.join(sessionCode)
  })

  // when client emits a 'joinSession' event
  client.on("joinSession", (data) => {
    const { sessionCode } = data

    // adds the client's ID to the room
    client.join(sessionCode)

    // server emits initialLoad event to this new client in the room
    io.to(sessionCode).emit("initialLoad", {})
  })

  client.on("updateQuestion", (data) => {
    const { sessionCode, questionData } = data
    io.to(sessionCode).emit("receiveNewQuestion", questionData)
  })

  // when client emits a 'realTime' event
  client.on("liveTyping", (data) => {
    const { sessionCode, input, output, code } = data

    // server emits 'realReceive' event to this client
    io.to(sessionCode).emit("receiveLiveTyping", { input, code, output })
  })

  // when client emits a 'realTime' event
  client.on("candidateLoseFocus", (data) => {
    const { sessionCode } = data

    // server emits 'realReceive' event to this client
    io.to(sessionCode).emit("receiveLoseFocusNotification", { sessionCode })
  })

  client.on("candidateGainFocus", (data) => {
    const { sessionCode } = data

    // server emits 'realReceive' event to this client
    io.to(sessionCode).emit("receiveGainFocusNotification", { sessionCode })
  })
}
