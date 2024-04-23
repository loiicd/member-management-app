import { QueryResult } from 'pg'
import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class SessionService {
  private async executeQueryWithTransaction(query: string, values: any[]): Promise<QueryResult<any>> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const result = await client.query(query, values)
      await client.query('COMMIT')
      return result
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async createSession(userId: string, token: string, expiresAt: Date): Promise<void> {
    const query = 'INSERT INTO public."user_session" (id, user_id, token, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)'
    const values = [uuidv4(), userId, token, new Date(), expiresAt]
    await this.executeQueryWithTransaction(query, values)
  }

  async deleteSession(userId: string): Promise<void> {
    const query = 'DELETE FROM public."user_session" WHERE user_id = $1'
    const values = [userId]
    await this.executeQueryWithTransaction(query, values)
  }

  async isSessionValid(token: string): Promise<boolean> {
    const query = 'SELECT * FROM public."user_session" WHERE token = $1 AND expires_at > NOW()'
    const values = [token]
    return (await this.executeQueryWithTransaction(query, values)).rows.length != 0 ? true : false
  }

  async getUserIdByToken(token: string): Promise<string> {
    const query = 'SELECT user_id FROM public."user_session" WHERE token = $1'
    const values = [token]
    return (await this.executeQueryWithTransaction(query, values)).rows[0].user_id
  }
}