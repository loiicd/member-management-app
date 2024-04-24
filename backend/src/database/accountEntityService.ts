import { Client } from 'pg'
import { AccountType } from '../models/accountShema'
import { connect } from './db'

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

  async create(id: string, name: string) {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = 'INSERT INTO public."account" (id, organisation_name) VALUES ($1, $2)'
      await client.query(query, [id, name])
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  // async addUserById(accountId: string, userId: string): Promise<void> {
  //   const client = await connect()
  //   try {
  //     await client.query('BEGIN')
  //     const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
  //     await client.query(query, [userId, accountId])
  //     await client.query('COMMIT')
  //   } catch (error) {
  //     await client.query('ROLLBACK')
  //     throw error
  //   } finally {
  //     await client.end()
  //   }
  // }

  // async removeUserById(accountId: string, userId: string): Promise<void> {
  //   const client = await connect()
  //   try {
  //     await client.query('BEGIN')
  //     const query = 'DELETE FROM public."user_account_rel" WHERE user_id = $1 AND account_id = $2 AND is_admin = false'
  //     await client.query(query, [userId, accountId])
  //     await client.query('COMMIT')
  //   } catch (error) {
  //     await client.query('ROLLBACK')
  //     throw error
  //   } finally {
  //     await client.end()
  //   }
  // }

  async addUserById(client: Client, userId: string, accountId: string): Promise<void> {
    const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    const values = [userId, accountId]
    await client.query(query, values)
  }

  async removeUserById(client: Client, accountId: string, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_account_rel" WHERE user_id = $1 AND account_id = $2 AND is_admin = false'
    const values = [userId, accountId]
    await client.query(query, values)
  }
}