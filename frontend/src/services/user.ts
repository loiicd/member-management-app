import axios from 'axios'
import { User } from '../types/user'
import { Authorization } from '../types/authorization'

export const getUser = async (id: string): Promise<User> => {
  const url = `http://localhost:3002/user/${id}`
  const response = await axios.get(url)
  return { ...response.data, birthdate: new Date(response.data.birthdate), created_at: new Date(response.data.created_at), updated_at: new Date(response.data.updated_at) }
}

export const getUsers = async (authorization: Authorization, searchTerm: string | undefined): Promise<User[]> => {
  const url = 'http://localhost:3002/user'
  const response = await axios.get(url, { params: { accountId: authorization.accountId, searchTerm } })
  return response.data.map((user: any) => ({ ...user, birthdate: new Date(user.birthdate), created_at: new Date(response.data.created_at), updated_at: new Date(response.data.updated_at) }))
}

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