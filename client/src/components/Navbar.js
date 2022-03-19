import React from "react"
import { useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar({ auth = false }) {
  const navigate = useNavigate()

  return (
    <nav>
      <span className="brand" onClick={() => navigate("/")}>
        <h1>CoderView</h1>
      </span>
      <span className="items">
        {auth ? (
          <div className="profile"></div>
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
