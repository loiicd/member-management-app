import axios from 'axios'
import { User } from '../types/user'

export const putPassword = async (userId: string, password: string): Promise<void> => {
  const url = `http://localhost:3002/user/password/${userId}?password=${password}`
  await axios.put(url)
}

export const updateUser = async (user: User): Promise<void> => {
  const url = 'http://localhost:3002/user'
  await axios.put(url, user)
}

export const getUserAccounts = async (userId: string): Promise<any> => {
  const url = `http://localhost:3002/user/accounts/${userId}`
  const response = await axios.get(url)
  return response.data
}