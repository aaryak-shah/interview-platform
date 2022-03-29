import "./App.css"
import { setUser, unsetUser } from "./redux/actions/user"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchProfileInfo } from "./requests/user"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Error from "./pages/Error/Error"
import publicRoutes from "./routes/config/public"
import protectedRoutes from "./routes/config/protected"
import StartSessionModal from "./components/SessionModal/StartSessionModal"
import JoinSessionModal from "./components/SessionModal/JoinSessionModal"

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProfileInfo()
      .then((res) => {
        dispatch(setUser(res.data))
      })
      .catch((err) => {
        console.error(err)
        dispatch(unsetUser())
      })
  }, [dispatch])

  return (
    <div className="App">
      {user.role === "interviewer" ? (
        <StartSessionModal />
      ) : (
        <JoinSessionModal />
      )}
      <Navbar auth={user.auth}></Navbar>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home auth={user.auth}></Home>}></Route>
          {publicRoutes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              element={route.element}></Route>
          ))}
          {user.auth
            ? protectedRoutes.map((route) => (
                <Route
                  exact
                  key={route.path}
                  path={route.path}
                  element={route.element}></Route>
              ))
            : null}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
