import axios from "./axiosConfig"

export const fetchProfileInfo = async () => {
  const url = "/profile/info"
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

export const fetchAuthoredQuestions = async () => {
  const url = "/profile/questions"
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    throw error.response
      ? error.response.data
      : { data: null, error: "Not Connected to server" }
  }
}

export const fetchCompanyQuestions = async () => {
  const url = "/profile/companyQuestions"
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    throw error.response
      ? error.response.data
      : { data: null, error: "Not Connected to server" }
  }
}
