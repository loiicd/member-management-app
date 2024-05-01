import { UserEntityService } from '../database/userEntityService'
import { SessionEntityService } from '../database/sessionEntityService'
import { BaseService } from './baseService'
import bcryptjs from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const sessionEntityService = new SessionEntityService
const userEntityService = new UserEntityService

export class SessionService extends BaseService {
  
  async createSession(email: string, password: string): Promise<void> {
    return this.performTransaction(async (client) => {
      const user = await userEntityService.getLoginDataByMail(client, email)

      const userExists = !!user

      if (!userExists) throw new Error('User not Exists')
      if (user.password === null) throw new Error('Password not in DB')

      const passwordIsIdentical = bcryptjs.compareSync(password+user.passwordsalt, user.password)

      if (!passwordIsIdentical) throw new Error('Invalid Credentials')

      const token = generateJsonWebToken(user.id, user.email)
      const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to the current date

      await sessionEntityService.insertSession(client, user.id, token, expirationDate)

      return { userId: user.id, email: user.login_email, firstname: user.firstname, lastname: user.lastname, token: token }
    })
  }

  async deleteSession(userId: string): Promise<void> {
    return this.performTransaction(async (client) => {
      await sessionEntityService.deleteSession(client, userId)
    })
  }

  async isSessionValid(token: string): Promise<boolean> {
    return this.performTransaction(async (client) => {
      return await sessionEntityService.selectSessionValidation(client, token)
    })
  }

  async getUserId(token: string): Promise<string> {
    return this.performTransaction(async (client) => {
      return await sessionEntityService.selectUserId(client, token)
    })
  }

}

const generateJsonWebToken = (userId: string, email: string): string => {
  const secretKey = 'your-secret-key'
  const payload = { userId, email }
  const options: jwt.SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, secretKey, options)
}