import React from "react"
import { MdWork, MdCalendarToday } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import "./QuestionCard.css"

function QuestionCard({ qid = "62337392c81479c37b7ae086" }) {
  const navigate = useNavigate()
  return (
    <div className="question-card" onClick={() => navigate(`/solve/${qid}`)}>
      <h2>Lorem ipsum dolor sit amet</h2>
      <div className="tag company-tag">
        <span className="icon">
          <MdWork />
        </span>
        <span>Google</span>
      </div>
      <div className="tag">
        <span className="icon">
          <MdCalendarToday />
        </span>
        <span>25th Aug, 2021</span>
      </div>
      <div className="">
        25k Attempts &bull;{" "}
        <span className="difficulty-tag difficulty-easy">easy</span>
      </div>
      {/* <button className="attempt">Try This Question</button> */}
    </div>
  )
}

export default QuestionCard
