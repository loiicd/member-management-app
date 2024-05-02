import { Client } from 'pg'

export class UserGroupRelEntityService {

  async getRelations(client: Client, groupId: string): Promise<string[]> {
    const query = 'SELECT user_id FROM public."user_group_rel" WHERE group_id = $1'
    const values = [groupId]
    return (await client.query(query, values)).rows.map((row) => row.user_id)
  }

  async insertRelation(client: Client, userId: string, groupId: string, accountId: string): Promise<void> {
    const query = 'INSERT INTO public."user_group_rel" (user_id, group_id, account_id) VALUES ($1, $2, $3)'
    const values = [userId, groupId, accountId]
    await client.query(query, values)
  }

  async deleteRelation(client: Client, userId: string, groupId: string, accountId: string): Promise<void> {
    const query = 'DELETE FROM public."user_group_rel" WHERE user_id = $1 AND group_id = $2 AND account_id = $3'
    const values = [userId, groupId, accountId]
    await client.query(query, values)
  }
  
}