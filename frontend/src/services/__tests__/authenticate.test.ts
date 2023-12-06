import axios, { AxiosResponse } from 'axios'
import { login } from '../authenticate'

jest.mock('axios')

describe('authenticate', () => {
  it('can login', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const expectedUrl = `http://localhost:3002/authenticate/login?email=${email}&password=${password}`;
    const expectedResponse: any = {
      data: 'mocked data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(expectedResponse)

    await login(email, password)
    expect(axios.get).toHaveBeenCalledWith(expectedUrl)
  })
})