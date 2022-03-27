import axios from "./axiosConfig"

export const startSession = async (data) => {
  const url = `/session/new`
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

export const sessionCheck = async (sid) => {
  const url = `/session/check/${sid}`
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

// export const joinSession = async (data) => {
//   const url = `/session/new`
//   try {
//     const res = await axios.post(url, data)
//     return res.data
//   } catch (error) {
//     console.error(error)
//     throw error.response
//       ? error.response.data
//       : { data: null, error: "Not Connected to server" }
//   }
// }
