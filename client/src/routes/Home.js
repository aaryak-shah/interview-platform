import React from "react"
import Dashboard from "../pages/home/Dashboard"
import Landing from "../pages/home/Landing"

function Home({ auth }) {
  return auth ? <Dashboard></Dashboard> : <Landing></Landing>
}

export default Home
