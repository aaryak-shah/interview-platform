import React from "react"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import { useSelector } from "react-redux"

function Profile() {
  const user = useSelector((state) => state.user)

  return <ProfilePage user={user} />
}

export default Profile
