import React, { useEffect, useState } from "react"
import QuestionCard from "../../components/QuestionCard"
import { logOut } from "../../requests/auth"
import { fetchAuthoredQuestions } from "../../requests/user"
import "./ProfilePage.css"

function ProfilePage({ user }) {
  let [questions, setQuestions] = useState([])

  function logout() {
    logOut()
      .then((res) => {
        window.location.href = "/"
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    fetchAuthoredQuestions()
      .then((res) => {
        setQuestions(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div className="profile-page">
      <div className="profile-info">
        <div className="profile-image">{user.name[0]}</div>
        <div className="profile-details">
          <h3>{user.name}</h3>
          <div className="email">{user.email}</div>
          <div className="role">
            {user.role}{" "}
            {user.role === "interviewer" ? " @ " + user.company : null}
          </div>
          <button className="logout-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="your-questions">
        <h2>
          Your {user.role === "interviewer" ? "Authored" : "Attempted"}{" "}
          Questions
        </h2>
        <section className="questions-grid">
          {questions.map((q) => {
            return <QuestionCard key={q._id} qid={q._id} />
          })}
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
