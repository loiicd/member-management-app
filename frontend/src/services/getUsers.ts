import axios from 'axios'

export const getUsers = async () => {
  const url = `http://localhost:3002/user`
  const response = await axios.get(url)
  return response.data
}