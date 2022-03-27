import Session from "../Session"
import Solve from "../Solve"

const protectedRoutes = [
  {
    element: <Solve />,
    path: "/solve/:qid",
  },
  {
    element: <Session />,
    path: "/session/:sid",
  },
]

export default protectedRoutes
