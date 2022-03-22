import axios from "./axiosConfig"

export const executeCode = async (data) => {
  const url = `/code`
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
