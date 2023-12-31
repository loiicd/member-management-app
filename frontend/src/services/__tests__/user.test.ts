import axios from 'axios'
import { getUser, getUsers, postUser, putPassword, updateUser, deleteUser } from '../user'

jest.mock('axios')

const goodResponse = {
  data: 'mocked data',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

describe('getUser', () => {
  const axiosGetMock = axios.get as jest.Mock
  const id = '123'
  const expectedUrl = `http://localhost:3002/user/${id}`

  it('call getUser with right url', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await getUser(id)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl)
  })

  it('return data from response', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    const data = await getUser(id)
    expect(data).toEqual('mocked data')
  })
})

describe('getUsers', () => {
  const axiosGetMock = axios.get as jest.Mock
  const expectedUrlWithSearchTerm = 'http://localhost:3002/user?searchTerm=test'
  const expectedUrlWithoutSearchTerm = 'http://localhost:3002/user'

  it('call getUsers with right url with search term', async () => {
    const searchTerm = 'test'
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await getUsers(searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithSearchTerm)
  })

  it('call getUsers with right url without search term', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    await getUsers(searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithoutSearchTerm)
  })

  it('return data from response', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponse)
    const data = await getUsers(searchTerm)
    expect(data).toEqual('mocked data')
  })
})

describe('postUser', () => {
  const axiosPostMock = axios.post as jest.Mock
  const user = {
    firstname: 'test',
    lastname: 'test',
    webaccess: true,
  }
  const expectedUrl = 'http://localhost:3002/user'

  it('call postUser with right url', async () => {
    axiosPostMock.mockResolvedValueOnce(goodResponse)
    await postUser(user)
    expect(axiosPostMock).toHaveBeenCalledTimes(1)
    expect(axiosPostMock).toHaveBeenCalledWith(expectedUrl, user)
  })
})

describe('putPassword', () => {
  const axiosPutMock = axios.put as jest.Mock
  const userId = '123'
  const password = 'test'
  const expectedUrl = `http://localhost:3002/user/password/${userId}?password=${password}`

  it('call postUser with right url', async () => {
    axiosPutMock.mockResolvedValueOnce(goodResponse)
    await putPassword(userId, password)
    expect(axiosPutMock).toHaveBeenCalledTimes(1)
    expect(axiosPutMock).toHaveBeenCalledWith(expectedUrl)
  })
})

describe('updateUser', () => {
  const axiosPutMock = axios.put as jest.Mock
  const user = {
    id: '123',
    firstname: 'test',
    lastname: 'test',
    webaccess: true,
    operationalQualifications: []
  }
  const expectedUrl = 'http://localhost:3002/user'

  it('call updateUser with right url', async () => {
    axiosPutMock.mockResolvedValueOnce(goodResponse)
    await updateUser(user)
    expect(axiosPutMock).toHaveBeenCalledTimes(1)
    expect(axiosPutMock).toHaveBeenCalledWith(expectedUrl, user)
  })
})

describe('deleteUser', () => {
  const axiosDeleteMock = axios.delete as jest.Mock
  const userId = '123'
  const expectedUrl = `http://localhost:3002/user/${userId}`

  it('call deleteUser with right url', async () => {
    axiosDeleteMock.mockResolvedValueOnce(goodResponse)
    await deleteUser(userId)
    expect(axiosDeleteMock).toHaveBeenCalledTimes(1)
    expect(axiosDeleteMock).toHaveBeenCalledWith(expectedUrl)
  })
})