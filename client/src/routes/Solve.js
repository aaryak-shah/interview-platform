import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Question from "../pages/Question/Question"
import { fetchQuestionInfo } from "../requests/question"

function Solve() {
  const { qid } = useParams()
  const [questionData, setQuestionData] = useState()
  useEffect(() => {
    fetchQuestionInfo(qid)
      .then((res) => {
        console.log(res)
        setQuestionData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [qid])
  return <Question questionData={questionData} />
}

export default Solve
