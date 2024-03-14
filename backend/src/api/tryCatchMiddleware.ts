import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const tryCatchMiddleware = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error)
        res.statusMessage = error.issues[0].message
        res.status(403).send({ errorType: 'Validation Error', message: error.issues[0].message })
      } else {
        console.error(error)
        res.status(500).send({ errorType: 'Internal Server Error', message: 'Internal Server Error' })
      }
    }
  }