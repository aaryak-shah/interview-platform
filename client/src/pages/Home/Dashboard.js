import React from "react"
import QuestionCard from "../../components/QuestionCard"
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <sub>Here's some questions you can practice</sub>
      <section className="questions-grid">
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
        <QuestionCard />
      </section>
    </div>
  )
}

export default Dashboard
