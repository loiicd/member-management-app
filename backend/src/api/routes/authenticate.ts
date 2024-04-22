import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { AuthenticateService } from '../../database/authenticateService'
import { SessionService } from '../../database/sessionService'

const router = express.Router()
const authenticateService = new AuthenticateService
const sessionService = new SessionService

router.post('/login', tryCatchMiddleware(async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password
  const response = await authenticateService.login(email, password)
  switch (response.type) {
    case 'Success':
      const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Add 7 days to the current date
      await sessionService.createSession(response.data.userId, response.data.token, expirationDate)
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

router.delete('/logout', tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = req.body.userId
  await sessionService.deleteSession(userId)
  res.sendStatus(201)
}))

export default router