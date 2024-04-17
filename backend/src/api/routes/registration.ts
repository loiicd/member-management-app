import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { AuthenticateService } from '../../database/authenticateService'
import { UserRegistrationShema } from '../../../src/models/userShema'
import { UserEntityService } from '../../../src/database/userEntityService'
import { ValidateError } from '../../../src/database/validateError'

const router = express.Router()
const userEntityService = new UserEntityService
const authenticateService = new AuthenticateService

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const data = req.body
  await authenticateService.register(data.organisationName, data.email, data.password)
  res.sendStatus(201)
}))

router.post('/user/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const data = UserRegistrationShema.parse(req.body)
  const test = await userEntityService.checkEmail(data.loginEmail)
  if (test) {
    throw new ValidateError('EMAIL_ALREADY_EXISTS', 'E-Mail exestiert bereits')
  }
  await authenticateService.registerUser(data.loginEmail, data.password, data.firstname, data.lastname)
  res.sendStatus(201)
}))

export default router