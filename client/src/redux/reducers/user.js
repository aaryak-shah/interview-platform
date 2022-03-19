const intitialState = { auth: false }

const user = (state = intitialState, action) => {
  switch (action.type) {
    case "SET_USER_AUTHENTICATION":
      return {
        auth: true,
        name: action.payload.name,
        email: action.payload.email,
        role: action.payload.role,
      }
    case "UNSET_USER_AUTHENTICATION":
      return { auth: false }
    default:
      return state
  }
}
export default user
