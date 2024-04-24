import { z } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { SessionService } from '../../database/sessionService'
import { UserService } from '../../services/userService'

const sessionService = new SessionService
const userService = new UserService

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = z.string().parse(req.headers.authorization)
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
    const accounts = await userService.getAccounts(userId)
    if (!accounts.find(account => account.id === accountId)) {
      res.sendStatus(401)
    }
  }

  next()
}