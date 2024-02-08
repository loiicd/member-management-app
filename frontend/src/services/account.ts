import axios from 'axios'
import { Account } from '../types/account'

export const getAccount = async (id: string): Promise<Account> => {
  const url = `http://localhost:3002/account/${id}`
  const response = await axios.get(url)
  return response.data
}