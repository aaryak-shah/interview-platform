module.exports.socketEvents = (client, io) => {
  console.log("socket events")
  // when client emits a 'hostSession' event
  client.on("hostSession", (data) => {
    const { sessionCode } = data
    console.log(`session ${sessionCode} hosted`)
    // adds the client's ID to the room
    client.join(sessionCode)
  })

  // when client emits a 'joinSession' event
  client.on("joinSession", (data) => {
    const { sessionCode } = data
    console.log(`session ${sessionCode} joined`)

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
    console.log(`session ${sessionCode} was live typed`)

    // server emits 'realReceive' event to this client
    io.to(sessionCode).emit("receiveLiveTyping", { input, code, output })
  })
}
