import { Client } from 'pg'
import { v4 as uuidv4 } from 'uuid'

export class SessionEntityService {
  
  async insertSession(client: Client, userId: string, token: string, expiresAt: Date): Promise<void> {
    const query = 'INSERT INTO public."user_session" (id, user_id, token, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), userId, token, new Date(), expiresAt]
    await client.query(query, values)
  }

  async deleteSession(client: Client, userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_session" WHERE user_id = $1'
    const values = [userId]
    await client.query(query, values)
  }

  async selectUserId(client: Client, token: string): Promise<string> {
    const query = 'SELECT user_id FROM public."user_session" WHERE token = $1 LIMIT 1'
    const values = [token]
    const user = await client.query(query, values)
    if (!user) {
      throw new Error('Session not found')
    }
    return user.rows[0].user_id
  }

  async selectSessionValidation(client: Client, token: string): Promise<boolean> {
    const query = 'SELECT * FROM public."user_session" WHERE token = $1 AND expires_at > NOW()'
    const values = [token]
    return (await client.query(query, values)).rows.length != 0 ? true : false
  }

}