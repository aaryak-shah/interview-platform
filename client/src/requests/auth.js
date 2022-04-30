import axios from "./axiosConfig"

export const signUp = async (data) => {
  const url = "/auth/new"
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error.response
      ? error.response.data
      : { data: null, error: "Not Connected to server" }
  }
}

export const logIn = async (data) => {
  const url = "/auth/login"
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (error) {
    console.error(error)
    throw error.response
      ? error.response.data
      : { data: null, error: "Not Connected to server" }
  }
}

export const logOut = async () => {
  const url = "/auth/logout"
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.error(error)
    throw error.response
      ? error.response.data
      : { data: null, error: "Not Connected to server" }
  }
}
