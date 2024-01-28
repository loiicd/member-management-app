import axios from 'axios'
import { qualification } from '../types/qualification'

export const getqualifications = async (accountId: string): Promise<qualification[]> => {
  const url = `http://localhost:3002/qualification?accountId=${accountId}`
  const response = await axios.get(url)
  return response.data
}

export const postqualification = async (accountId: string, qualification: any): Promise<void> => {
  const url = 'http://localhost:3002/qualification/'
  await axios.post(url, { params: { accountId, qualification } })
} 