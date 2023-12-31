import axios from 'axios'
import { getOperationalQualifications, postOperationalQualification } from '../operationalQualification'

jest.mock('axios')

const goodResponse = {
  data: 'mocked data',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

describe('getOperationalQualifications', () => {
  const axiosGetMock = axios.get as jest.Mock
  const expectedUrl = 'http://localhost:3002/operationalQualification/'

  it('call getOperationalQualifications with right url', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await getOperationalQualifications()
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl)
  })

  it('return data from response', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    const data = await getOperationalQualifications()
    expect(data).toEqual('mocked data')
  })
})

describe('postOperationalQualification', () => {
  const axiosPostMock = axios.post as jest.Mock
  const qualification = {name: 'test', abbreviation: 'tt'}
  const expectedUrl = 'http://localhost:3002/operationalQualification/'

  it('call postOperationalQualification with right url & data', async () => {
    axiosPostMock.mockResolvedValueOnce(goodResponse)
    await postOperationalQualification(qualification)
    expect(axiosPostMock).toHaveBeenCalledTimes(1)
    expect(axiosPostMock).toHaveBeenCalledWith(expectedUrl, qualification)
  })
})