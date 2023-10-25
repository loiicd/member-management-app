import axios from 'axios'
import { User } from '../types/user'

export const updateUser = async (user: User) => {
  const url = `http://localhost:3002/user`
  await axios.put(url, user)
}