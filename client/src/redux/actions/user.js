export const setUser = (payload) => {
  return { type: "SET_USER_AUTHENTICATION", payload }
}
export const unsetUser = () => {
  return { type: "UNSET_USER_AUTHENTICATION", payload: null }
}
