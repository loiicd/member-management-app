import { connect } from './db'
import { v4 as uuidv4 } from 'uuid'

export class SessionService {
  async createSession(userId: string, token: string, expiresAt: Date): Promise<void> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = 'INSERT INTO public."user_session" (id, user_id, token, created_at, expires_at) VALUES ($1, $2, $3, $4, $5)'
      await client.query(query, [uuidv4(), userId, token, new Date(), expiresAt])
      await client.query('COMMIT')
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async deleteSession(userId: string): Promise<void> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = `DELETE FROM public."user_session" WHERE user_id = '${userId}'`
      await client.query(query)
      await client.query('COMMIT')
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async checkValidSession(token: string): Promise<boolean> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = `SELECT * FROM public."user_session" WHERE token = $1 AND expires_at > NOW()`
      const result = await client.query(query, [token])
      await client.query('COMMIT')
      return result.rowCount != 0 ? true : false
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }

  async getUserIdByToken(token: string): Promise<string> {
    const client = await connect()
    try {
      await client.query('BEGIN')
      const query = `SELECT user_id FROM public."user_session" WHERE token = $1`
      const result = await client.query(query, [token])
      await client.query('COMMIT')
      return result.rows[0].user_id
    } catch(error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }
}