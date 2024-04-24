import { Client } from 'pg'
import { connect } from '../database/db'

export class BaseService {
  protected async performTransaction(callback: (client: Client) => Promise<any>): Promise<any> {
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
      await client.end()
    }
  }
}