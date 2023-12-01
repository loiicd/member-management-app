import axios from 'axios'

export const getUsers = async (searchTerm: string | undefined) => {
  let url: string
  if (searchTerm) {
    url = `http://localhost:3002/user?searchTerm=${searchTerm}`
  } else {
    url = 'http://localhost:3002/user'
  }
  const response = await axios.get(url)
  return response.data
}