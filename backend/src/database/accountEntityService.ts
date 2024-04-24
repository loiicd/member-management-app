import { Client } from 'pg'
import { AccountType } from '../models/accountShema'

export class AccountEntityService {
  async selectAccount(client: Client, accountId: string): Promise<AccountType> {
    const query = 'SELECT id, organisation_name FROM public."account" WHERE id = $1'
    const values = [accountId]
    return (await client.query(query, values)).rows[0]
  }

  async insertAccount(client: Client, accountId: string, organisationName: string): Promise<void> {
    const query = 'INSERT INTO public."account" (id, organisation_name) VALUES ($1, $2)'
    const values = [accountId, organisationName]
    await client.query(query, values)
  }

  async insertUserRel(client: Client, userId: string, accountId: string): Promise<void> {
    const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    const values = [userId, accountId]
    await client.query(query, values)
  }

  async deleteUserRel(client: Client, accountId: string, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_account_rel" WHERE user_id = $1 AND account_id = $2 AND is_admin = false'
    const values = [userId, accountId]
    await client.query(query, values)
  }
}