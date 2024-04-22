import axios, { AxiosInstance } from 'axios'

export class BaseApiClient {
  protected axiosInstance: AxiosInstance

  constructor(baseURL: string, authToken: string | undefined, accountId: string | undefined) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
        accountid: accountId
      }
    })
  }

  public setAuthToken(authToken: string | undefined) {
    this.axiosInstance.defaults.headers.Authorization = `Bearer ${authToken}`
  }
}