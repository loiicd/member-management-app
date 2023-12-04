import axios, { AxiosResponse } from 'axios'

export const login = async (email: string, password: string): Promise<AxiosResponse> => {
  const url = `http://localhost:3002/authenticate/login?email=${email}&password=${password}`
  const response = await axios.get(url)
  return response
}