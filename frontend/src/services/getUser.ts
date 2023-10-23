import axios from 'axios'

export const getUser = async (id: string) => {
  const url = `http://localhost:3002/user/${id}`
  const response = await axios.get(url)
  return response.data
}