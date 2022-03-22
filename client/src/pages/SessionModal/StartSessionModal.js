import React, { useState } from "react"
import Modal from "../../components/Modal"
import { startSession } from "../../requests/interview"
import "./StartSessionModal.css"

function StartSessionModalContent() {
  let [candidateEmail, setCandidateEmail] = useState("")

  function submit(e) {
    e.preventDefault()
    startSession({ candidateEmail })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <form className="start-session-form" onSubmit={submit}>
      <label htmlFor="candidate-email">Enter candidate's email id</label>
      <div className="session-form-input">
        <input
          type="email"
          name="candidate-email"
          placeholder="email@example.com"
          value={candidateEmail}
          onChange={(e) => {
            setCandidateEmail(e.target.value)
          }}
          required
        />
        <button className="start-session-btn">Start Session</button>
      </div>
    </form>
  )
}

function StartSessionModal() {
  return (
    <Modal
      modalTitle={"Start an interview session"}
      ModalContent={<StartSessionModalContent></StartSessionModalContent>}
    />
  )
}

export default StartSessionModal
