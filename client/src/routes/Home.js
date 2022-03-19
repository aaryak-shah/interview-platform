import React from "react"
import Dashboard from "../pages/Home/Dashboard"
import Landing from "../pages/Home/Landing"

function Home({ auth }) {
  return auth ? <Dashboard></Dashboard> : <Landing></Landing>
}

export default Home
