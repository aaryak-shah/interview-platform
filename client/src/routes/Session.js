import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Question from "../pages/Question/Question"
import { useSelector } from "react-redux"
import VC from "../pages/VC/VC"
import { sessionCheck } from "../requests/interview"
import SessionPage from "../pages/SessionPage/SessionPage"

function Session() {
  const navigate = useNavigate()
  const { sid } = useParams()
  let [questionData, setQuestionData] = useState({})
  const user = useSelector((state) => state.user)

  useEffect(() => {
    sessionCheck(sid)
      .then((res) => {
        console.log(res)
        setQuestionData(res.data.assignedQuestion)
      })
      .catch((err) => {
        console.error(err)
        navigate("/")
      })
  }, [])

  return <SessionPage sid={sid} questionData={questionData} />
}

export default Session
