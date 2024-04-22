import { connect } from './db'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export class AuthenticateService {
  async registerUser(email: string, password: string, firstname: string, lastname: string): Promise<void> {
    const client = await connect()
    try {
      const userId = uuidv4()
      const salt = bcryptjs.genSaltSync()
      const hashedPassword = bcryptjs.hashSync(password+salt)
      await client.query('BEGIN')
      await client.query('INSERT INTO public."user" (id, firstname, lastname, login_email, password, passwordsalt, webaccess, is_online_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [userId, firstname, lastname, email, hashedPassword, salt, true, true])
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      await client.end()
    }
  }
}