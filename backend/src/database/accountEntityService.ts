import { AccountType } from '../models/accountShema'
import { connect } from './db'

export class AccountEntityService {
  async getOneById(id: string): Promise<AccountType> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = `
        SELECT id, organisation_name
        FROM public."account"
        WHERE id = $1
      `
      const result = await client.query(query, [id])
      await client.query('COMMIT')
      return result.rows[0]
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }
}