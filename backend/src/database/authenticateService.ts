import { connect } from './db'
import bcryptjs from 'bcryptjs'

export class AuthenticateService {
  async login(email: string, password: string): Promise<boolean> {
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
    return response
  }
}