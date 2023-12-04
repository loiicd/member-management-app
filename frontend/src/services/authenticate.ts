import axios from 'axios'

export const login = async (email: string, password: string) => {
  const url = `http://localhost:3002/authenticate/login?email=${email}&password=${password}`
  const response = await axios.get(url)
  return response
}