import { NextFunction, Request, Response } from 'express'
import { ValidateError } from '../database/validateError'
import { ZodError } from 'zod'

export const tryCatchMiddleware = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        res.statusMessage = error.issues[0].message
        res.status(403).send({ errorType: 'Validation Error', message: error.issues[0].message })
      } else if (error instanceof ValidateError) {
        switch (error.name) {
          case 'USER_NOT_FOUND':
            return res.status(404).send({ errorType: 'User not found', message: 'User exestiert nicht' })
          case 'USER_ALREADY_IN_ACCOUNT':
            return res.status(409).send({ errorType: 'User already in Acc', message: 'User ist bereits mit Acc verknüpft' })
          case 'EMAIL_ALREADY_EXISTS':
            return res.status(409).send({ errorType: 'Email already exists', message: 'E-Mail exestiert bereits' })
        }
      } else if (error instanceof Error && error.message === 'Invalid Credentials') {
        res.sendStatus(401)
      } else if (error instanceof Error && error.message === 'Unauthorized Access') {
        res.sendStatus(401)
      } else {
        res.sendStatus(500)
      }
    }
  }