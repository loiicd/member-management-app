import axios from 'axios'
import { OperationalQualification } from '../types/operationalQualification'

export const getOperationalQualifications = async (accountId: string): Promise<OperationalQualification[]> => {
  const url = `http://localhost:3002/operationalQualification?accountId=${accountId}`
  const response = await axios.get(url)
  return response.data
}

export const postOperationalQualification = async (accountId: string, operationalQualification: any): Promise<void> => {
  const url = 'http://localhost:3002/operationalQualification/'
  await axios.post(url, { params: { accountId, operationalQualification } })
} 