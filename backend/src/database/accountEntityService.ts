import { AccountType } from '../models/accountShema'
import { connect } from './db'
import { ValidateError } from './validateError'

export class AccountEntityService {
  async getOneById(id: string): Promise<AccountType> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = 'SELECT id, organisation_name FROM public."account" WHERE id = $1'
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

  async addUserById(accountId: string, userId: string): Promise<void> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
      await client.query(query, [userId, accountId])
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw new ValidateError('USER_ALREADY_IN_ACCOUNT', 'User already in account')
    } finally {
      await client.end()
    }
  }
}