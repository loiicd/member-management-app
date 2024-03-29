import { Account } from '../types/account'
import { BaseApiClient } from './baseApiClient'

export class AccountApiClient extends BaseApiClient {

  async getAccounts(accountId: string): Promise<Account> {
    return (await this.axiosInstance.get(`account/${accountId}`)).data
  }

  async addUser(accountId: string, loginEmail: string): Promise<void> {
    await this.axiosInstance.post('account/user', { accountId, loginEmail })
  }
}