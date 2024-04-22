import { UserEntityService } from '../database/userEntityService'
import * as jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { SessionService } from '../database/sessionService'

const userEntityService = new UserEntityService()
const sessionService = new SessionService()

export const loginHandler = async (email: string, password: string): Promise<any> => {
  const user = await userEntityService.getLoginDataByMail(email)
  const userExists = !!user

  if (!userExists) throw new Error('Invalid Credentials')
  if (user.password === null) throw new Error('Invalid Credentials')

  const passwordIsIdentical = bcryptjs.compareSync(password+user.passwordsalt, user.password)

  if (!passwordIsIdentical) throw new Error('Invalid Credentials')

  const token = generateJsonWebToken(user.id, user.email)
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to the current date
  await sessionService.createSession(user.id, token, expirationDate)

  return { userId: user.id, email: user.email, token: token }
}

const generateJsonWebToken = (userId: string, email: string): string => {
  const secretKey = 'your-secret-key'
  const payload = { userId, email }
  const options: jwt.SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, secretKey, options)
}