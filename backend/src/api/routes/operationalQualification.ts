import express, { Request, Response } from 'express'
import { OperationalQualificationEntityService } from '../../database/operationalQualificationEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'

const router = express.Router()
const operationalQualificationEntityService = new OperationalQualificationEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const operationalQualifications = await operationalQualificationEntityService.getAll()
  res.status(200).send(operationalQualifications)
}))

export default router