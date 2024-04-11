import axios from 'axios'
import { login } from '../authenticate'

jest.mock('axios')

describe('authenticate', () => {
  const axiosPostMock = axios.post as jest.Mock
  const email = 'test@example.com'
  const password = 'password123'
  const expectedCall = ["http://localhost:3002/authenticate/login", {"email": "test@example.com", "password": "password123"}]
  const goodResponse = {
    data: 'mocked data',
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  }

  it('call login with right url', async () => {
    axiosPostMock.mockResolvedValueOnce(goodResponse)
    await login(email, password)
    expect(axiosPostMock).toHaveBeenCalledTimes(1)
    expect(axiosPostMock).toHaveBeenCalledWith(expectedCall)
  })

  it('return right data', async () => {
    axiosPostMock.mockResolvedValueOnce(goodResponse)
    const result = await login(email, password)
    expect(result).toEqual({"config": {}, "data": "mocked data", "headers": {}, "status": 200, "statusText": "OK"})
  })
})