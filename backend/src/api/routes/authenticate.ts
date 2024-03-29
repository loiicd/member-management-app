import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { AuthenticateService } from '../../database/authenticateService'

const router = express.Router()
const authenticateService = new AuthenticateService

router.post('/login', tryCatchMiddleware(async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password
  const response = await authenticateService.login(email, password)
  switch (response.type) {
    case 'Success':
      res.status(200).send({ type: 'Success', userId: response.data.userId, email: response.data.email, token: response.data.token })
      break
    case 'PasswordMissed':
      res.status(303).send({ type: 'PasswordMissed', userId: response.data.userId })
      break
    case 'Error':
      res.status(401).send({ type: 'Error', message: 'Invalid email or password!'})
      break
  }
}))

export default router