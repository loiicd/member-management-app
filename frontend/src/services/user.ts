import axios from 'axios'
import { User } from '../types/user'

type test = {
  firstname: string,
  lastname: string,
  birthdate?: Date,
  address?: string,
  email?: string,
  phone?: string,
  webaccess: boolean,
}

export const getUser = async (id: string) => {
  const url = `http://localhost:3002/user/${id}`
  const response = await axios.get(url)
  return response.data
}

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

export const postUser = async (user: test) => {
  const url = `http://localhost:3002/user`
  await axios.post(url, user)
}

export const putPassword = async (userId: string, password: string) => {
  const url = `http://localhost:3002/user/password/${userId}?password=${password}`
  await axios.put(url)
}

export const updateUser = async (user: User) => {
  const url = `http://localhost:3002/user`
  console.log(user)
  await axios.put(url, user)
}

export const deleteUser = async (id: string) => {
  const url = `http://localhost:3002/user/${id}`
  await axios.delete(url)
}