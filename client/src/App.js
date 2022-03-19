import "./App.css"
import { setUser, unsetUser } from "./redux/actions/user"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProfileInfo } from "./requests/user"
import Landing from "./routes/home/Landing"
import Dashboard from "./routes/home/Dashboard"

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProfileInfo()
      .then((res) => {
        dispatch(setUser(res.data))
      })
      .catch((err) => {
        dispatch(unsetUser())
      })
  }, [dispatch, user])

  return (
    <div className="App">
      {user.auth ? <Dashboard></Dashboard> : <Landing></Landing>}
    </div>
  )
}

export default App
