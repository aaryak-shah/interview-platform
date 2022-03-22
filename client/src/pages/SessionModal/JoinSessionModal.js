import React, { useState } from "react"
import Modal from "../../components/Modal"
import "./JoinSessionModal.css"

function JoinSessionModalContent() {
  let [sessionCode, setSessionCode] = useState("")

  function submit(e) {
    e.preventDefault()
  }

  return (
    <form className="join-session-form" onSubmit={submit}>
      <label htmlFor="candidate-email">Enter interview session code</label>
      <div className="session-form-input">
        <input
          type="text"
          name="candidate-email"
          value={sessionCode}
          onChange={(e) => {
            setSessionCode(e.target.value)
          }}
          required
        />
        <button className="start-session-btn">Join Session</button>
      </div>
    </form>
  )
}

function JoinSessionModal() {
  return (
    <Modal
      modalTitle={"Join an interview session"}
      ModalContent={<JoinSessionModalContent></JoinSessionModalContent>}
    />
  )
}

export default JoinSessionModal
