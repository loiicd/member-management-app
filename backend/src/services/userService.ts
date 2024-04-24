import { UserEntityService } from '../database/userEntityService'
import { AccountEntityService } from '../database/accountEntityService'
import { Client } from 'pg'
import { connect } from '../database/db'
import { AccountType } from '../models/accountShema'
import { UserFormDataType, UserType } from '../models/userShema'
import { v4 as uuidv4 } from 'uuid'
import { ApiResponse } from '../types/apiResponse'

const userEntityService = new UserEntityService
const accountEntityService = new AccountEntityService

export class UserService {
  private async performTransaction(callback: (client: Client) => Promise<any>): Promise<any> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const result = await callback(client)
      await client.query('COMMIT')
      return result
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.end()
    }
  }

  async createUser(accountId: string, userFormData: UserFormDataType): Promise<ApiResponse> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getOneByMail(client, userFormData.login_email)
      if (user) {
        const accounts = await userEntityService.getAccounts(client, user.id) 
        const accountRelExists = accounts.some(account => account.id === accountId)
        if (accountRelExists) {
          return { type: 'relExists', userId: user.id }
        } else {
          return { type: 'mailExists', userId: user.id}
        }
      } else {
        const userId = uuidv4()
        await userEntityService.insertUser(client, userId, userFormData)
        await accountEntityService.addUserById(client, userId, accountId)
        return { type: 'userCreated' }
      }
    })
  }

  async deleteUser(userId: string, accountId: string): Promise<string> {
    return await this.performTransaction(async (client) => {
      const user = await userEntityService.getOneById(client, userId)
      if (!user) {
        throw new Error('User exestiert nicht')
      }

      const accounts = await userEntityService.getAccounts(client, accountId)
      if (accounts.length > 1) {
        await accountEntityService.removeUserById(client, accountId, userId)
        return 'User wurde aus Account entfernt'
      } else {
        await accountEntityService.removeUserById(client, accountId, userId)
        await userEntityService.removeQualifications(client, userId)
        await userEntityService.deleteUser(client, userId)
        return 'User wurde gelöscht'
      }
    })
  }

  async getUserById(userId: string): Promise<UserType[]> {
    return await this.performTransaction(async (client) => {
      const user = await userEntityService.getOneById(client, userId)
      user.qualifications = await userEntityService.getQualifications(client, userId)
      return user
    })
  }

  async getAccounts(userId: string): Promise<AccountType[]> {
    const client = await connect()
    return await userEntityService.getAccounts(client, userId)
  }
}