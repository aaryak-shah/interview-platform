import React, { useState } from "react"
import { logIn, signUp } from "../../requests/auth"
import "./Auth.css"
import { useNavigate } from "react-router-dom"

function Auth({ signup = false }) {
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [company, setCompany] = useState("N/A")
  let [role, setRole] = useState("candidate")
  let [password, setPwd] = useState("")
  let [password2, setPwd2] = useState("")

  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    console.log(role)
    if (signup) {
      console.log("Signing Up")
      console.log(password)
      console.log(password2)
      if (password !== password2) {
        console.log("Passwords do not match")
        alert("Passwords do not match")
        return
      } else {
        signUp({ name, email, company, role, password })
          .then((res) => {
            console.log(res.data)
            window.location.href = "/"
          })
          .catch((err) => {
            console.error(err)
            navigate("/")
          })
      }
    } else {
      console.log("Logging In")
      logIn({ email, password })
        .then((res) => {
          window.location.href = "/"
        })
        .catch((err) => {
          console.error(err)
          navigate("/")
        })
    }
  }

  return (
    <>
      <div className="auth-page">
        <div className="auth-box">
          <h2>{signup ? "Sign Up" : "Log In"}</h2>
          <sub>
            {signup
              ? "Join the CoderView platform today!"
              : "Log in to access your account"}
          </sub>
          <form className="auth-form" onSubmit={submit} action="#">
            {signup ? (
              <>
                <label htmlFor="name">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Ex. John Doe"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
                <label htmlFor="role">Account Type</label>
                <div
                  className="radio-btns"
                  radioGroup="role"
                  onChange={(e) => setRole(e.target.value)}>
                  <div>
                    <input
                      className="radio-input"
                      type="radio"
                      name="role"
                      id="candidate"
                      value="candidate"
                      radioGroup="role"
                      defaultChecked={role === "candidate"}
                    />
                    <label className="radio-label" htmlFor="candidate">
                      Candidate
                    </label>
                  </div>
                  <div>
                    <input
                      className="radio-input"
                      type="radio"
                      name="role"
                      id="interviewer"
                      value="interviewer"
                      radioGroup="role"
                    />
                    <label className="radio-label" htmlFor="interviewer">
                      Interviewer
                    </label>
                  </div>
                </div>
              </>
            ) : null}
            {signup && role === "interviewer" ? (
              <>
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Ex. Googele, Facebook, etc."
                  onChange={(e) => setCompany(e.target.value)}
                />
              </>
            ) : null}
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              placeholder="youremail@example.com"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              name="password"
              onChange={(e) => {
                console.log(e)
                setPwd(e.target.value)
              }}
            />
            {signup ? (
              <>
                <label htmlFor="password2">Confirm Password</label>
                <input
                  required
                  type="password"
                  name="password2"
                  onChange={(e) => {
                    console.log(e)
                    setPwd2(e.target.value)
                  }}
                />
              </>
            ) : null}
            <button className="submit-auth-form" onSubmit={submit}>
              {signup ? "JOIN" : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
