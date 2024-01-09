import axios from 'axios'
import { User, UserFormData } from '../types/user'

export const getUser = async (id: string): Promise<User> => {
  const url = `http://localhost:3002/user/${id}`
  const response = await axios.get(url)
  return { ...response.data, birthdate: new Date(response.data.birthdate) }
}

export const getUsers = async (searchTerm: string | undefined): Promise<User[]> => {
  let url: string
  if (searchTerm) {
    url = `http://localhost:3002/user?searchTerm=${searchTerm}`
  } else {
    url = 'http://localhost:3002/user'
  }
  const response = await axios.get(url)
  response.data.forEach((user: any) => user.birthdate = new Date(user.birthdate))
  return response.data
}

export const postUser = async (user: UserFormData): Promise<void> => {
  const url = `http://localhost:3002/user`
  await axios.post(url, user)
}

export const putPassword = async (userId: string, password: string): Promise<void> => {
  const url = `http://localhost:3002/user/password/${userId}?password=${password}`
  await axios.put(url)
}

export const updateUser = async (user: User): Promise<void> => {
  const url = `http://localhost:3002/user`
  await axios.put(url, user)
}

export const deleteUser = async (id: string): Promise<void> => {
  const url = `http://localhost:3002/user/${id}`
  await axios.delete(url)
}