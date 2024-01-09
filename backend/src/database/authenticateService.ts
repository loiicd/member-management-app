import { connect } from './db'
import bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

export class AuthenticateService {
  async login(email: string, password: string): Promise<string | null> {
    const client = await connect()
    const query = `
      SELECT id, email, password, passwordsalt, webaccess
      FROM public."user" 
      WHERE email = '${email}'`
    const result = await client.query(query)
    const user = result.rows[0]
    const userFound = !!user
    client.end()

    if (!userFound) return null
    if (!user.webaccess) return null

    const response = bcryptjs.compareSync(password+user.passwordsalt, user.password)

    if (response) {
      const token = generateJsonWebToken(user.id, user.email)
      return token
    } else {
      return null
    }
  }

  async register(organisationName: string, email: string, password: string) {
    const client = await connect()
    try {
      const salt = bcryptjs.genSaltSync()
      const hashedPassword = bcryptjs.hashSync(password+salt)
      await client.query('BEGIN')
      const userId = uuidv4()
      await client.query('INSERT INTO public."user" (id, firstname, lastname, email, password, webaccess) VALUES ($1, $2, $3, $4, $5, $6)', [userId, 'admin', 'admin', email, hashedPassword, true])
      await client.query('INSERT INTO public."account" (id, organisation_name, admin_user_id) VALUES ($1, $2, $3)', [uuidv4(), organisationName, userId])
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