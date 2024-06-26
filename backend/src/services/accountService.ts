import { v4 as uuidv4 } from 'uuid'
import { AccountEntityService } from '../database/accountEntityService'
import { UserEntityService } from '../database/userEntityService'
import { AccountType } from '../models/accountShema'
import { BaseService } from './baseService'
import { UserAccountRelEntityService } from '../database/userAccountRelEntityService'

const accountEntityService = new AccountEntityService
const userEntityService = new UserEntityService
const userAccountRelEntityService = new UserAccountRelEntityService

export class AccountService extends BaseService {
  
  async getOneById(accountId: string): Promise<AccountType> {
    return this.performTransaction(async (client) => {
      return await accountEntityService.selectAccount(client, accountId)
    })
  }

  async createAccount(organisationName: string, userId: string): Promise<void> {
    return this.performTransaction(async (client) => {
      const accountId = uuidv4()
      await accountEntityService.insertAccount(client, accountId, organisationName)
      await userAccountRelEntityService.insertRelation(client, userId, accountId)
    })
  }
  
  async addUserByMail(email: string, accountId: string): Promise<void> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneByMail(client, email)
      if (!user) {
        throw new Error('E-Mail exestiert nicht')
      }
      await userAccountRelEntityService.insertRelation(client, user.id, accountId)
    })
  }

}