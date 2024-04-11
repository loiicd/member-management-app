import axios from "axios"
import { AccountApiClient } from "../accountApiClient"

jest.mock('axios')

describe('accountApiClient', () => {
  let client: AccountApiClient
  const axiosCreateMock = axios.create as jest.Mock
  axiosCreateMock.mockReturnValue(axios)

  describe('getAccount', () => {
    const axiosGetMock = axios.get as jest.Mock

    beforeEach(() => {
      client = new AccountApiClient('http://localhost:3002', undefined, '123')
      axiosGetMock.mockResolvedValueOnce({ data: {id: '123', organisation_name: 'Example Organization' }})
    })

    it('should call right url', async () => {
      await client.getAccount('123')
      expect(axiosGetMock).toHaveBeenCalledTimes(1)
      expect(axiosGetMock).toHaveBeenCalledWith('account/123')
    })

    it('should return data', async () => {
      const response = await client.getAccount('123')
      expect(response).toEqual({id: '123', organisation_name: 'Example Organization' })
    })
  })

  describe('addUser', () => {
    const axiosPostMock = axios.post as jest.Mock

    beforeEach(() => {
      client = new AccountApiClient('http://localhost:3002', undefined, '123')
      axiosPostMock.mockResolvedValueOnce({ data: { success: true } })
    })

    it('should call right url & body', async () => {
      await client.addUser('123', 'foo@example.com')
      expect(axiosPostMock).toHaveBeenCalledTimes(1)
      expect(axiosPostMock).toHaveBeenCalledWith('account/user', {accountId: '123', loginEmail: 'foo@example.com'})
    })
  })
})