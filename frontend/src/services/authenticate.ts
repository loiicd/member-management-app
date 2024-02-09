import axios, { AxiosResponse } from 'axios'

// export const login = async (email: string | undefined, password: string | undefined): Promise<AxiosResponse> => {
//   const url = `http://localhost:3002/authenticate/login?email=${email}&password=${password}`
//   const response = await axios.get(url)
//   return response
// }

export const login = async (email: string | undefined, password: string | undefined): Promise<AxiosResponse> => {
  const url = 'http://localhost:3002/authenticate/login'
  const response = await axios.post(url, { email, password })
  return response

}

export const register = async (organisationName: string, email: string, password: string): Promise<AxiosResponse> => {
  console.log('register function called')
  const url = 'http://localhost:3002/registration'
  const response = await axios.post(url, { organisationName, email, password })
  console.log('api called')
  return response
}