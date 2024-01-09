import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { AuthenticateService } from '../../database/authenticateService'

const router = express.Router()
const authenticateService = new AuthenticateService

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  console.log('POST /registration')
  const data = req.body
  authenticateService.register(data.organisationName, data.email, data.password)
  res.status(200).send('Successfully registered')
}))

export default router