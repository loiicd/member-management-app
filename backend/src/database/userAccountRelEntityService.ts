import { Client } from 'pg'

export class UserAccountRelEntityService {

  async insertRelation(client: Client, userId: string, accountId: string): Promise<void> {
    const query = 'INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, false)'
    const values = [userId, accountId]
    await client.query(query, values)
  }

  async deleteRelation(client: Client, userId: string, accountId: string): Promise<void> {
    const query = 'DELETE FROM public."user_account_rel" WHERE user_id = $1 AND account_id = $2 AND is_admin = false'
    const values = [userId, accountId]
    await client.query(query, values)
  }
  
}