import * as jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { SessionService } from '../services/sessionService'
import { UserService } from '../services/userService'

const sessionService = new SessionService
const userService = new UserService

export const loginHandler = async (email: string, password: string): Promise<any> => {
  const user = await userService.getLoginDataByMail(email)
  const userExists = !!user

  if (!userExists) throw new Error('User not Exists')
  if (user.password === null) throw new Error('Password not in DB')

  const passwordIsIdentical = bcryptjs.compareSync(password+user.passwordsalt, user.password)

  if (!passwordIsIdentical) throw new Error('Invalid Credentials')

  const token = generateJsonWebToken(user.id, user.email)
  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to the current date
  await sessionService.createSession(user.id, token, expirationDate)

  return { userId: user.id, email: user.login_email, firstname: user.firstname, lastname: user.lastname, token: token }
}

const generateJsonWebToken = (userId: string, email: string): string => {
  const secretKey = 'your-secret-key'
  const payload = { userId, email }
  const options: jwt.SignOptions = { expiresIn: '7d' }
  return jwt.sign(payload, secretKey, options)
}