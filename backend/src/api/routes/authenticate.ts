import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { SessionService } from '../../services/sessionService'
import { loginHandler } from '../../handler/loginHandler'
import { z } from 'zod'

const router = express.Router()
const sessionService = new SessionService

router.post('/login', tryCatchMiddleware(async (req: Request, res: Response) => {
  const email = z.string().email().parse(req.body.email)
  const password = z.string().parse(req.body.password)
  const response = await loginHandler(email, password)
  res.status(200).send(response)
}))

router.delete('/logout', tryCatchMiddleware(async (req: Request, res: Response) => {
  const userId = z.string().uuid().parse(req.body.userId)
  await sessionService.deleteSession(userId)
  res.sendStatus(201)
}))

export default router