import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import "./AssignQuestionModal.css"
import { useNavigate } from "react-router-dom"
import { fetchCompanyQuestions } from "../../requests/user"
import openSocket from "socket.io-client"
import { assignSessionQuestion } from "../../requests/interview"
import { fetchQuestionInfo } from "../../requests/question"

const socket = openSocket("http://localhost:9000")

function AssignQuestionModalContent({ sessionCode }) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetchCompanyQuestions()
      .then((res) => {
        setQuestions(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  function submit(qid) {
    assignSessionQuestion({ sid: sessionCode, qid })
      .then((res) => {
        fetchQuestionInfo(qid)
          .then((res) => {
            console.log(res.data)
            socket.emit("updateQuestion", {
              sessionCode,
              questionData: res.data,
            })
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((err) => {
        console.error(err)
      })
    document
      .querySelectorAll(".modal-overlay")
      .forEach((e) => e.classList.remove("show-modal"))
  }

  return (
    <div className="questions-list">
      {questions.map((q) => (
        <div className="questions-list-item">
          <p>{q.title}</p>
          <div className={`difficulty-tag difficulty-${q.difficulty}`}>
            {q.difficulty}
          </div>
          <button className="assign-question" onClick={() => submit(q._id)}>
            Assign
          </button>
        </div>
      ))}
    </div>
  )
}

function AssignQuestionModal({ sessionCode }) {
  return (
    <Modal
      modalTitle={"Assign a question"}
      ModalContent={
        <AssignQuestionModalContent
          sessionCode={sessionCode}></AssignQuestionModalContent>
      }
      purpose={"assign"}
    />
  )
}

export default AssignQuestionModal
