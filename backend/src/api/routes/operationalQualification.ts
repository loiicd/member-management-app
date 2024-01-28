import express, { Request, Response } from 'express'
import { OperationalQualificationEntityService } from '../../database/operationalQualificationEntityService'
import { tryCatchMiddleware } from '../tryCatchMiddleware'
import { validateOperationalQualificationFormData, validateUUID } from '../validate'

const router = express.Router()
const operationalQualificationEntityService = new OperationalQualificationEntityService

router.get('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  console.log(req.query)
  const accountId = validateUUID(req.query.accountId)
  const operationalQualifications = await operationalQualificationEntityService.getAll(accountId)
  res.status(200).send(operationalQualifications)
}))

router.post('/', tryCatchMiddleware(async (req: Request, res: Response) => {
  const accountId = validateUUID(req.params.accountId)
  const operationalQualification = validateOperationalQualificationFormData(req.body.params.operationalQualification)
  await operationalQualificationEntityService.insert(accountId, operationalQualification)
  res.status(200).send('Operational qualification created') 
}))

export default router