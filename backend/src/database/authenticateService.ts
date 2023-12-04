import { connect } from './db'
import bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

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

    if (!userFound) false
    if (!user.webaccess) false

    const response = bcryptjs.compareSync(password, user.password)


    if (response) {
      const token = generateJsonWebToken(user.id, user.email)
      return token
    } else {
      return null
    }
  }
}

const generateJsonWebToken = (userId: string, email: string): string => {
  const secretKey = 'your-secret-key'
  const payload = { userId, email }
  const options: jwt.SignOptions = {
    expiresIn: '1h',
  }
  return jwt.sign(payload, secretKey, options)
}