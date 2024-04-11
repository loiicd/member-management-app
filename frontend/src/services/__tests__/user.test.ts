import axios from 'axios'
import { getUser, getUsers, putPassword, updateUser } from '../user'
import { Authorization } from '../../types/authorization'

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
    qualifications: [],
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
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
    qualifications: [],
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
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
    qualifications: [],
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
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

const authorization: Authorization = {
  userId: '123',
  email: 'max.mustermann@example.com',
  accountId: '987'
}

const expectedResponseData = {
  "address": "Musterstraße 1, 12345 Musterstadt", 
  "birthdate": new Date('1981-05-08'), 
  "email": "max.mustermann@example.com", 
  "firstname": "Max", 
  "id": "123", 
  "lastname": "Mustermann", 
  "qualifications": [], 
  "phone": "1234567890", 
  "webaccess": true,
  "created_at": new Date('2022-01-01'),
  "updated_at": new Date('2022-01-01'),
}
const expectedResponseDataMany = [
  {
    "address": "Musterstraße 1, 12345 Musterstadt", 
    "birthdate": new Date ('1981-05-08'), 
    "email": "max.mustermann@example.com", 
    "firstname": "Max", 
    "id": "123", 
    "lastname": "Mustermann", 
    "qualifications": [], 
    "phone": "1234567890", 
    "webaccess": true,
    "created_at": new Date('2022-01-01'),
    "updated_at": new Date('2022-01-01'),
  }, {
    "address": "Musterstraße 2, 12345 Musterstadt", 
    "birthdate": new Date ('1990-10-04'), 
    "email": "erika.musterfrau@example.com", 
    "firstname": "Erika", 
    "id": "456", 
    "lastname": "Musterfrau", 
    "qualifications": [], 
    "phone": "0987654321", 
    "webaccess": true,
    "created_at": new Date('2022-01-01'),
    "updated_at": new Date('2022-01-01'),
  }]

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
  const expectedUrlWithSearchTerm = 'http://localhost:3002/user'
  const expectedBodyWithSearchTerm = {"params": {"accountId": "987", "searchTerm": "test"}}
  const expectedUrlWithoutSearchTerm = 'http://localhost:3002/user'
  const expectedBodyWithoutSearchTerm = {"params": {"accountId": "987", "searchTerm": undefined}}

  it('call getUsers with right url with search term', async () => {
    const searchTerm = 'test'
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    await getUsers(authorization, searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithSearchTerm, expectedBodyWithSearchTerm)
  })

  it('call getUsers with right url without search term', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    await getUsers(authorization, searchTerm)
    expect(axiosGetMock).toHaveBeenCalledTimes(1)
    expect(axiosGetMock).toHaveBeenCalledWith(expectedUrlWithoutSearchTerm, expectedBodyWithoutSearchTerm)
  })

  it('return data from response', async () => {
    const searchTerm = undefined
    axiosGetMock.mockResolvedValueOnce(goodResponseMany)
    const data = await getUsers(authorization, searchTerm)
    expect(data).toEqual(expectedResponseDataMany)
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
    qualifications: [],
    isOnlineUser: true,
    created_at: new Date(),
    updated_at: new Date()
  }
  const expectedUrl = 'http://localhost:3002/user'

  it('call updateUser with right url & data', async () => {
    axiosPutMock.mockResolvedValueOnce(goodResponse)
    await updateUser(user)
    expect(axiosPutMock).toHaveBeenCalledTimes(1)
    expect(axiosPutMock).toHaveBeenCalledWith(expectedUrl, user)
  })
})