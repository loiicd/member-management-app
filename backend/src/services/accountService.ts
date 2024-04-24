import { Client } from 'pg'
import { connect } from '../database/db'
import { AccountEntityService } from '../database/accountEntityService'
import { UserEntityService } from '../database/userEntityService'

const accountEntityService = new AccountEntityService
const userEntityService = new UserEntityService

export class AccountService {
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
  
  async addUserByMail(email: string, accountId: string): Promise<void> {
    this.performTransaction(async (client) => {
      const user = await userEntityService.getOneByMail(client, email)

      if (!user) {
        throw new Error('E-Mail exestiert nicht')
      }

      await accountEntityService.addUserById(client, user.id, accountId)
    })
  }
}