import { connect } from './db'
import bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

type LoginResponse = SuccessResponse | PasswordMissedResponse | ErrorResponse

type SuccessResponse = { type: 'Success', data: { userId: string, email: string, token: string } }
type PasswordMissedResponse = { type: 'PasswordMissed', data: { userId: string } }
type ErrorResponse = { type: 'Error' }

export class AuthenticateService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const client = await connect()
    const query = `
      SELECT id, login_email, password, passwordsalt
      FROM public."user" 
      WHERE login_email = '${email}'`
    const result = await client.query(query)
    const user = result.rows[0]
    const userFound = !!user 
    client.end()
    if (!userFound) return { type: 'Error' }
    if (!user.password) return { type: 'PasswordMissed', data: { userId: user.id } }
    const passwordsMatch = bcryptjs.compareSync(password+user.passwordsalt, user.password)
    if (passwordsMatch) {
      const token = generateJsonWebToken(user.id, user.email)
      return { type: 'Success', data: { userId: user.id, email: user.email, token: token }}
    } else {
      return { type: 'Error' }
    }
  }

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

const generateJsonWebToken = (userId: string, email: string): string => {
  const secretKey = 'your-secret-key'
  const payload = { userId, email }
  const options: jwt.SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, secretKey, options)
}