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
  
}