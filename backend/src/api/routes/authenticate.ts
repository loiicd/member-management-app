import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { AuthenticateService } from '../../database/authenticateService'
import { validateUserLogin } from '../validate'

const router = express.Router()
const authenticateService = new AuthenticateService

router.get('/login', tryCatchMiddleware(async (req: Request, res: Response) => {
  const userLogin = validateUserLogin(req.query)
  const token = await authenticateService.login(userLogin.email, userLogin.password)
  if (token !== null) {
    res.status(200).send({ type: 'Success', email: userLogin.email,token: token })
  } else {
    res.status(401).send('Unauthorized')
  }
}))

export default router