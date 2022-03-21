import axios from "./axiosConfig"

export const fetchQuestionInfo = async (qid) => {
  const url = `/question/view/${qid}`
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

export const createNewQuestion = async (data) => {
  const url = `/question/new`
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
