import axios from 'axios'

export const getOperationalQualifications = async () => {
  const url = 'http://localhost:3002/operationalQualification/'
  const response = await axios.get(url)
  return response.data
}

export const postOperationalQualification = async (operationalQualification: any): Promise<void> => {
  const url = 'http://localhost:3002/operationalQualification/'
  await axios.post(url, operationalQualification)
}