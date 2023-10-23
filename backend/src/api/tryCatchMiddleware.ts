import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const tryCatchMiddleware = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error)
        res.status(400).send('Bad Request')
      } else {
        console.error(error)
        res.status(500).send('Internal Server Error')
      }
    }
  }