import axios from 'axios'
import { login } from '../authenticate'

jest.mock('axios')

describe('authenticate', () => {
  const axiosGetMock = axios.get as jest.Mock
  const email = 'test@example.com'
  const password = 'password123'
  const expectedUrl = `http://localhost:3002/authenticate/login?email=${email}&password=${password}`
  const goodResponse = {
    data: 'mocked data',
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  }

  it('call login with right url', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await login(email, password)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl)
  })

  it('return right data', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    const result = await login(email, password)
    expect(result).toEqual({"config": {}, "data": "mocked data", "headers": {}, "status": 200, "statusText": "OK"})
  })
})