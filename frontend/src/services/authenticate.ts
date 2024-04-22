import axios, { AxiosResponse } from 'axios'

export const login = async (email: string | undefined, password: string | undefined): Promise<AxiosResponse> => {
  const url = 'http://localhost:3002/authenticate/login'
  const response = await axios.post(url, { email, password })
  return response
}

export const logout = async (userId: string): Promise<void> => {
  const url = 'http://localhost:3002/authenticate/logout'
  await axios.delete(url, { data: { userId } })
}

export const checkIfLoginEmailExists = async (email: string): Promise<boolean> => {
  const response = await axios.get(`http://localhost:3002/user/email/${email}`)
  return response.data.emailExists
}

export const registerUser =  async (loginEmail: string, password: string, firstname: string, lastname: string): Promise<void> => {
  const url = 'http://localhost:3002/registration/user'
  await axios.post(url, { loginEmail, password, firstname, lastname })
}