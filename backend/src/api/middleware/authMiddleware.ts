import { NextFunction, Request, Response } from 'express'
import { validateString } from '../validate'
import { SessionService } from '../../database/sessionService'
import { UserEntityService } from '../../database/userEntityService'
import { z } from 'zod'

const sessionService = new SessionService()
const userEntityService = new UserEntityService()

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = validateString(req.headers.authorization)
  const accountId = z.string().optional().parse(req.headers.accountid)

  const splitAuthToken = authToken.split(' ')[1]

  const userId = await sessionService.getUserIdByToken(splitAuthToken)
  if (!userId) {
    res.sendStatus(401)
  }

  const sessionIsValid = await sessionService.isSessionValid(splitAuthToken)
  if (!sessionIsValid) {
    res.sendStatus(401)
  }

  if (accountId) {
    const accounts = await userEntityService.getAccounts(userId)
    if (!accounts.find(account => account.id === accountId)) {
      res.sendStatus(401)
    }
  }

  next()
}