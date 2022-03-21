import QuestionCard from "../../components/QuestionCard"
import "./Dashboard.css"
import { useSelector } from "react-redux"
import NewQuestionForm from "../../components/NewQuestionForm"
import { useEffect, useState } from "react"
import { fetchPublicQuestions } from "../../requests/public"

function Dashboard() {
  let user = useSelector((state) => state.user)

  let [questions, setQuestions] = useState([])

  useEffect(() => {
    if (user.role === "candidate") {
      fetchPublicQuestions()
        .then((res) => {
          console.log(res)
          setQuestions(res.data)
        })
        .catch((err) => {
          console.error(err)
          setQuestions([])
        })
    }
  }, [])

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      {user.role === "candidate" ? (
        <>
          <div className="dashboard-banner">
            <h4>Quick Start</h4>
            <p>
              To join an interview, use the <em>JOIN SESSION</em> button at the
              top and enter your interview code.
            </p>
            <p>
              Some interviews have public questions that you can practice any
              time.
            </p>
          </div>
          <sub>Here's some questions you can practice</sub>
          <section className="questions-grid">
            {questions.map((q) => {
              return <QuestionCard qid={q._id} />
            })}
          </section>
        </>
      ) : (
        <>
          <div className="dashboard-banner">
            <h4>Quick Start</h4>
            <p>
              To start a new interview session, use the <em>START SESSION</em>{" "}
              button at the top.
            </p>
            <p>To write a new question, use the form below.</p>
          </div>
          <h3>New Question</h3>
          <NewQuestionForm />
        </>
      )}
    </div>
  )
}

export default Dashboard
