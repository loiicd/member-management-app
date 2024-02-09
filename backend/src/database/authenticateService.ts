import { connect } from './db'
import bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

// type LoginResponseType = 'Success' | 'PasswordMissed' | 'Error'
// type DataResponseType = { userId: string, email: string, token: string } | { userId: string } 

type LoginResponse = SuccessResponse | PasswordMissedResponse | ErrorResponse


type SuccessResponse = { type: 'Success', data: { userId: string, email: string, token: string } }
type PasswordMissedResponse = { type: 'PasswordMissed', data: { userId: string } }
type ErrorResponse = { type: 'Error' }

export class AuthenticateService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const client = await connect()
    const query = `
      SELECT id, email, password, passwordsalt
      FROM public."user" 
      WHERE email = '${email}'`
    const result = await client.query(query)
    const user = result.rows[0]
    const userFound = !!user
    client.end()

    if (!userFound) return { type: 'Error' }

    if (!user.password) return { type: 'PasswordMissed', data: { userId: user.id } }

    const response = bcryptjs.compareSync(password+user.passwordsalt, user.password)

    if (response) {
      const token = generateJsonWebToken(user.id, user.email)
      return { type: 'Success', data: { userId: user.id, email: user.email, token: token }}
    } else {
      return { type: 'Error' }
    }
  }

  async register(organisationName: string, email: string, password: string): Promise<void> {
    const client = await connect()
    try {
      const salt = bcryptjs.genSaltSync()
      const hashedPassword = bcryptjs.hashSync(password+salt)
      await client.query('BEGIN')
      const userId = uuidv4()
      const accountId = uuidv4()
      await client.query('INSERT INTO public."user" (id, firstname, lastname, email, password, webaccess) VALUES ($1, $2, $3, $4, $5, $6)', [userId, 'admin', 'admin', email, hashedPassword, true])
      await client.query('INSERT INTO public."account" (id, organisation_name) VALUES ($1, $2)', [accountId, organisationName])
      await client.query('INSERT INTO public."user_account_rel" (user_id, account_id, is_admin) VALUES ($1, $2, $3)', [userId, accountId, true])
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
  const options: jwt.SignOptions = {
    expiresIn: '1m',
  }
  return jwt.sign(payload, secretKey, options)
}