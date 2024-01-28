import axios from 'axios'
import { getqualifications, postqualification } from '../qualification'

jest.mock('axios')

const goodResponse = {
  data: 'mocked data',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

describe('getqualifications', () => {
  const axiosGetMock = axios.get as jest.Mock
  const expectedUrl = 'http://localhost:3002/qualification/'
  const accountId = '123'

  it('call getqualifications with right url & params', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await getqualifications(accountId)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl, { params: { accountId } })
  })

  it('return data from response', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    const data = await getqualifications(accountId)
    expect(data).toEqual('mocked data')
  })
})

describe('postqualification', () => {
  const axiosPostMock = axios.post as jest.Mock
  const qualification = {name: 'test', abbreviation: 'tt'}
  const expectedUrl = 'http://localhost:3002/qualification/'
  const accountId = '123'

  it('call postqualification with right url & data', async () => {
    axiosPostMock.mockResolvedValueOnce(goodResponse)
    await postqualification(accountId, qualification)
    expect(axiosPostMock).toHaveBeenCalledTimes(1)
    expect(axiosPostMock).toHaveBeenCalledWith(expectedUrl, { params: { accountId, qualification } })
  })
})