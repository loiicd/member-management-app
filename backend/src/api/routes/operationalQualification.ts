import express, { Request, Response } from 'express'
import { OperationalQualificationEntityService } from '../../database/operationalQualificationEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateOperationalQualificationFormData } from '../validate'

const router = express.Router()
const operationalQualificationEntityService = new OperationalQualificationEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const operationalQualifications = await operationalQualificationEntityService.getAll()
  res.status(200).send(operationalQualifications)
}))

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  console.log('Requestbody', req.body)
  const operationalQualification = validateOperationalQualificationFormData(req.body)
  await operationalQualificationEntityService.insert(operationalQualification)
  res.status(200).send('Operational qualification created') 
}))

export default router