import Login from "../Login"
import Signup from "../Signup"

const publicRoutes = [
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
]

export default publicRoutes
