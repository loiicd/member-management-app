import { Client } from 'pg'

export class UserQualificationRelEntityService {

  async selectRelationsByQualification(client: Client, qualificationId: string): Promise<any[]> {
    const query = 'SELECT * FROM public."user_qualification_rel" WHERE qualification_id = $1'
    const values = [qualificationId]
    return (await client.query(query, values)).rows
  }

  async insertRelation(client: Client, userId: string, qualificationId: string, accountId: string): Promise<void> {
    const query = 'INSERT INTO public."user_qualification_rel" (user_id, qualification_id, account_id) VALUES ($1, $2, $3)'
    const values = [userId, qualificationId, accountId]
    await client.query(query, values)
  }

  async deleteRelation(client: Client, userId: string, qualificationId: string, accountId: string): Promise<void> {
    const query = 'DELETE FROM public."user_qualification_rel" WHERE user_id = $1 AND qualification_id = $2 AND account_id = $3'
    const values = [userId, qualificationId, accountId]
    await client.query(query, values)
  }

  async deleteAllRelations(client: Client, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_qualification_rel" WHERE user_id = $1'
    const values = [userId]
    await client.query(query, values)
  }
  
}