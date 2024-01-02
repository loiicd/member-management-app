import axios from 'axios'
import { getUser, getUsers, postUser, putPassword, updateUser, deleteUser } from '../user'

jest.mock('axios')

const resultDataOne = {
  id: '123',
    firstname: 'Max',
    lastname: 'Mustermann',
    birthdate: '1981-05-08',
    address: 'Musterstraße 1, 12345 Musterstadt',
    email: 'max.mustermann@example.com',
    phone: '1234567890',
    webaccess: true,
    operationalQualifications: []
}
const resultDataMany = [
  {
    id: '123',
    firstname: 'Max',
    lastname: 'Mustermann',
    birthdate: '1981-05-08',
    address: 'Musterstraße 1, 12345 Musterstadt',
    email: 'max.mustermann@example.com',
    phone: '1234567890',
    webaccess: true,
    operationalQualifications: []
  },
  {
    id: '456',
    firstname: 'Erika',
    lastname: 'Musterfrau',
    birthdate: '1990-10-04',
    address: 'Musterstraße 2, 12345 Musterstadt',
    email: 'erika.musterfrau@example.com',
    phone: '0987654321',
    webaccess: true,
    operationalQualifications: []
  }
]

const goodResponseOne = {
  data: resultDataOne,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const goodResponseMany = {
  data: resultDataMany,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const goodResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
}

const expectedResponseData = {"address": "Musterstraße 1, 12345 Musterstadt", "birthdate": new Date('1981-05-08'), "email": "max.mustermann@example.com", "firstname": "Max", "id": "123", "lastname": "Mustermann", "operationalQualifications": [], "phone": "1234567890", "webaccess": true}
const expectedResponseDataMany = [{"address": "Musterstraße 1, 12345 Musterstadt", "birthdate": new Date ('1981-05-08'), "email": "max.mustermann@example.com", "firstname": "Max", "id": "123", "lastname": "Mustermann", "operationalQualifications": [], "phone": "1234567890", "webaccess": true}, {"address": "Musterstraße 2, 12345 Musterstadt", "birthdate": new Date ('1990-10-04'), "email": "erika.musterfrau@example.com", "firstname": "Erika", "id": "456", "lastname": "Musterfrau", "operationalQualifications": [], "phone": "0987654321", "webaccess": true}]

describe('getUser', () => {
  const axiosGetMock = axios.get as jest.Mock
  const id = '123'
  const expectedUrl = `http://localhost:3002/user/${id}`

  it('call getUser with right url', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponseOne)
    await getUser(id)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrl)
  })

  it('return data from response', async () => {
    axiosGetMock.mockResolvedValueOnce(goodResponseOne)
    const data = await getUser(id)
    expect(data).toEqual(expectedResponseData)
  })
})

describe('getUsers', () => {
  const axiosGetMock = axios.get as jest.Mock
  const expectedUrlWithSearchTerm = 'http://localhost:3002/user?searchTerm=test'
  const expectedUrlWithoutSearchTerm = 'http://localhost:3002/user'

  it('call getUsers with right url with search term', async () => {
    const searchTerm = 'test'
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    await getUsers(searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithSearchTerm)
  })

  it('call getUsers with right url without search term', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    await getUsers(searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithoutSearchTerm)
  })

  it('return data from response', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    const data = await getUsers(searchTerm)
    expect(data).toEqual(expectedResponseDataMany)
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

  it('call postUser with right url & data', async () => {
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

  it('call updateUser with right url & data', async () => {
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