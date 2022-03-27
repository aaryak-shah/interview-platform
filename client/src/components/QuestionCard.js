import React, { useEffect, useState } from "react"
import { MdWork, MdCalendarToday } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { fetchQuestionInfo } from "../requests/question"
import formatDate from "../utils"
import "./QuestionCard.css"

function QuestionCard({ qid }) {
  const navigate = useNavigate()
  let [questionData, setQuestionData] = useState({})
  useEffect(() => {
    fetchQuestionInfo(qid)
      .then((res) => {
        console.log(res)
        setQuestionData(res.data)
      })
      .catch((err) => {
        console.error(err)
        setQuestionData({})
      })
  }, [])
  return (
    <div className="question-card" onClick={() => navigate(`/solve/${qid}`)}>
      <h2>{questionData.title}</h2>
      <div className="tag company-tag">
        <span className="icon">
          <MdWork />
        </span>
        <span>{questionData.company?.name}</span>
      </div>
      <div className="tag">
        <span className="icon">
          <MdCalendarToday />
        </span>
        <span>{formatDate(new Date(questionData.createdAt))}</span>
      </div>
      <div className="">
        {questionData.attempts ? questionData.attempts : 0} attempts &bull;{" "}
        <span
          className={`difficulty-tag difficulty-${
            questionData.difficulty ? questionData.difficulty : "medium"
          }`}>
          {questionData.difficulty ? questionData.difficulty : "medium"}
        </span>
      </div>
      {/* <button className="attempt">Try This Question</button> */}
    </div>
  )
}

export default QuestionCard
