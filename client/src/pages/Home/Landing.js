import React from "react"
import "./Landing.css"
import {
  MdVideoCall,
  MdCode,
  MdPeople,
  MdLock,
  MdAssignment,
} from "react-icons/md"

function Landing() {
  return (
    <>
      <section className="landing">
        <div className="hero">
          <h2>Join CoderView Now!</h2>
          <p>
            Get access to a unified platform for hosting, joining and practicing
            for your coding interviews.
          </p>
          <button className="btn-join">Sign Up</button>
        </div>
        <div className="features-list">
          <h1>Features</h1>
          <div className="feature-items">
            <div className="feature-item-card">
              <div className="ft-icon">
                <MdVideoCall></MdVideoCall>
              </div>
              <div className="ft-title">
                <h3>Integrated Video Conferencing</h3>
              </div>
              <div className="ft-desc">
                Access a fully featured interview setup with coding and video
                conferencing built in to the service.
              </div>
            </div>
            <div className="feature-item-card">
              <div className="ft-icon">
                <MdCode></MdCode>
              </div>
              <div className="ft-title">
                <h3>Live Coding and Remote Execution</h3>
              </div>
              <div className="ft-desc">
                Type your code on a real code editor during your interviewers.
                Run your code and view your results over the cloud, without
                setting up anything on your computer.
              </div>
            </div>
            <div className="feature-item-card">
              <div className="ft-icon">
                <MdPeople></MdPeople>
              </div>
              <div className="ft-title">
                <h3>Collaborative Coding</h3>
              </div>
              <div className="ft-desc">
                Interviewers can see candidates' code being typed live, and
                interact with it as they desire.
              </div>
            </div>
            <div className="feature-item-card">
              <div className="ft-icon">
                <MdLock></MdLock>
              </div>
              <div className="ft-title">
                <h3>Detect Cheating</h3>
              </div>
              <div className="ft-desc">
                Get notified if a candidate is cheating by switching tabs in the
                browser or using a different application on their computers.
              </div>
            </div>
            <div className="feature-item-card">
              <div className="ft-icon">
                <MdAssignment></MdAssignment>
              </div>
              <div className="ft-title">
                <h3>Practice Real Questions</h3>
              </div>
              <div className="ft-desc">
                Practice real interview questions uploaded by companies at any
                time.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
