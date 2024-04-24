import { UserEntityService } from '../database/userEntityService'
import { AccountEntityService } from '../database/accountEntityService'
import { Client } from 'pg'
import { connect } from '../database/db'

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

  async createUser(): Promise<void> {
    
  }

  async deleteUser(userId: string, accountId: string): Promise<string> {
    return await this.performTransaction(async (client) => {
      const user = await userEntityService.getOneByIdTest(client, userId)
      if (!user) {
        throw new Error('User exestiert nicht')
      }

      const accounts = await userEntityService.getAccountsTest(client, accountId)
      await accountEntityService.removeUserByIdTest(client, accountId, userId)
      if (accounts.length > 1) {
        return 'User wurde aus Account entfernt'
      } else {
        await userEntityService.removeQualifications(client, userId)
        await userEntityService.deleteUser(client, userId)
        return 'User wurde gelöscht'
      }
    })
  }
}