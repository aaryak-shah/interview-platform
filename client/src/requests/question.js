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
