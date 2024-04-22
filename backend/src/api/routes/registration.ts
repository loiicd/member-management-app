import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { UserRegistrationShema } from '../../models/userShema'
import { registrationHandler } from '../../handler/registrationHandler'

const router = express.Router()

router.post('/user/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const user = UserRegistrationShema.parse(req.body)
  await registrationHandler(user)
  res.sendStatus(201)
}))

export default router