import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import "./Navbar.css"
import StartSessionModal from "../pages/SessionModal/StartSessionModal"

function Navbar({ auth = false }) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  function launchModal() {
    document.querySelector(".modal-overlay").classList.add("show-modal")
    console.log(
      "opening modal",
      document.querySelector(".modal-overlay").classList
    )
  }

  return (
    <nav>
      <span className="brand" onClick={() => navigate("/")}>
        <h1>CoderView</h1>
      </span>
      <span className="items">
        {auth ? (
          <div className="profile">
            <button className="join-session-btn" onClick={launchModal}>
              {user.role === "candidate" ? "Join Session" : "Start Session"}
            </button>
            <div className="profile-btn">
              <div className="profile-icon">{user.name[0]}</div>
              <div className="profile-text">Welcome, {user.name}</div>
            </div>
          </div>
        ) : (
          <div className="auth">
            <button className="login" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        )}
      </span>
    </nav>
  )
}

export default Navbar
