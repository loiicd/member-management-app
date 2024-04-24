import express, { Request, Response } from 'express'
import { z } from 'zod'
import { tryCatchMiddleware } from '../middleware/tryCatchMiddleware'
import { validateEmail, validateUUID } from '../validate'
import { authMiddleware } from '../middleware/authMiddleware'
import { AccountService } from '../../services/accountService'

const router = express.Router()
const accountService = new AccountService

router.get('/:id', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.params.id)
  const account = await accountService.getOneById(accountId)
  res.status(200).send(account)
}))

router.post('/', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const organisationName = z.string().parse(req.body.organisationName)
  const userId = z.string().parse(req.body.userId)
  await accountService.createAccount(organisationName, userId)
  res.sendStatus(201)
}))

router.post('/user', authMiddleware, tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.body.accountId)
  const loginEmail = validateEmail(req.body.loginEmail)
  await accountService.addUserByMail(loginEmail, accountId)
  res.sendStatus(201)
}))

export default router