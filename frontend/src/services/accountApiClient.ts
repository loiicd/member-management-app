import { Account } from '../types/account'
import { BaseApiClient } from './baseApiClient'

type ApiResponse = {
  type: string
  message: string
}

export class AccountApiClient extends BaseApiClient {

  async getAccount(accountId: string): Promise<Account> {
    return (await this.axiosInstance.get(`account/${accountId}`)).data
  }

  async addUser(accountId: string, loginEmail: string): Promise<void> {
    await this.axiosInstance.post('account/user', { accountId, loginEmail })
  }
}