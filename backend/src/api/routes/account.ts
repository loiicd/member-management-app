import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateEmail, validateUUID } from '../validate'
import { AccountEntityService } from '../../database/accountEntityService'
import { UserEntityService } from '../../database/userEntityService'

const router = express.Router()
const accountEntityService = new AccountEntityService
const userEntityService = new UserEntityService

router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const account = await accountEntityService.getOneById(id)
  res.status(200).send(account)
}))

router.post('/user', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.body.accountId)
  const loginEmail = validateEmail(req.body.loginEmail)
  const user = await userEntityService.getOneByEmail(loginEmail)
  accountEntityService.addUserById(accountId, user.id)
  res.sendStatus(201)
}))

export default router