import express, { Request, Response } from 'express'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateEmail, validateUUID } from '../validate'
import { AccountEntityService } from '../../database/accountEntityService'
import { UserEntityService } from '../../database/userEntityService'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const router = express.Router()
const accountEntityService = new AccountEntityService
const userEntityService = new UserEntityService

router.get('/:id', tryCatchMiddleware(async (req: Request, res: Response) => {
  const id = validateUUID(req.params.id)
  const account = await accountEntityService.getOneById(id)
  res.status(200).send(account)
}))

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const organisationName = z.string().parse(req.body.organisationName)
  const userId = z.string().parse(req.body.userId)
  const accountId = uuidv4()
  await accountEntityService.create(accountId, organisationName)
  await accountEntityService.addUserById(accountId, userId)
  res.sendStatus(201)
}))

router.post('/user', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.body.accountId)
  const loginEmail = validateEmail(req.body.loginEmail)
  const user = await userEntityService.getOneByEmail(loginEmail)
  await accountEntityService.addUserById(accountId, user.id)
  res.sendStatus(201)
}))

export default router