import React from "react"
import { useNavigate } from "react-router-dom"

function Error() {
  let navigate = useNavigate()
  return (
    <>
      <h1>Opps! This Page Doesn't Exist</h1>
      <button className="home" onClick={() => navigate("/")}>
        Return Home
      </button>
    </>
  )
}

export default Error
