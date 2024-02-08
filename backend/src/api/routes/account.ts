import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateUUID } from '../validate'
import { AccountEntityService } from '../../database/accountEntityService'

const router = express.Router()
const accountEntityService = new AccountEntityService

router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  console.log('Happen', req.params.id)
  const id = validateUUID(req.params.id)
  const account = await accountEntityService.getOneById(id)
  console.log('Account', account)
  res.status(200).send(account)
}))

export default router